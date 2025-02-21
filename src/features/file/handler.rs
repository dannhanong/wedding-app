use axum::{
    extract::{Multipart, State},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use futures_util::StreamExt; // Import từ futures_util
use mongodb::{Client, bson::doc};
use uuid::Uuid;
use tokio::{fs, io::AsyncWriteExt};
use std::path::Path;
use chrono::Utc;
use crate::features::file::model::FileUpload;
use axum::body::Bytes;
use mime_guess;
use tokio::fs::File;
use tokio::io::AsyncReadExt; // Thêm import này

#[derive(serde::Serialize)]
pub struct ResponseMessage {
    msg: String,
}

/// Handler upload file thông qua multipart form-data
pub async fn upload_file(
    State(client): State<Client>,
    mut multipart: Multipart,
) -> Result<Json<FileUpload>, (StatusCode, String)> {
    // Đường dẫn lưu file
    let upload_dir = "./uploads";
    if !Path::new(upload_dir).exists() {
        fs::create_dir_all(upload_dir)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    }

    // Lấy file đầu tiên từ multipart request
    let field = multipart
        .next_field()
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    
    if let Some(mut field) = field {
        let file_name = field.file_name().unwrap_or("file").to_string();
        let file_code = Uuid::new_v4().to_string();
        let file_path = format!("{}/{}", upload_dir, file_code);

        // Đọc dữ liệu file từ request
        let mut file_bytes = Vec::new();
        while let Some(chunk) = field.next().await {
            let data = chunk.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
            file_bytes.extend_from_slice(&data);
        }

        // Ghi file vào ổ đĩa
        let mut file = fs::File::create(&file_path)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        file.write_all(&file_bytes)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        // Tạo metadata cho file
        let file_upload = FileUpload {
            id: None,
            file_name: file_name.clone(),
            file_type: extract_file_extension(&file_name),
            file_size: file_bytes.len() as i64,
            file_code: file_code.clone(),
            created_at: Utc::now(),
        };

        // Lưu metadata vào MongoDB
        let db = client.database("file_service");
        let collection = db.collection::<FileUpload>("files");
        collection.insert_one(&file_upload).await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        return Ok(Json(file_upload));
    }

    Err((StatusCode::BAD_REQUEST, "Không tìm thấy file upload".into()))
}

/// Hàm helper để trích xuất phần mở rộng của file từ tên file
fn extract_file_extension(file_name: &str) -> String {
    std::path::Path::new(file_name)
        .extension()
        .and_then(std::ffi::OsStr::to_str)
        .map(|s| s.to_string())
        .unwrap_or_default()
}

/// Một endpoint đơn giản để kiểm tra kết nối MongoDB
pub async fn test_connection(State(client): State<Client>) -> Json<ResponseMessage> {
    let db = client.database("file_service");
    let _ = db.list_collection_names().await;
    Json(ResponseMessage {
        msg: "Kết nối MongoDB thành công".to_string(),
    })
}

/// Handler để xem trước hình ảnh từ file_code
pub async fn preview_image(
    State(client): State<Client>,
    axum::extract::Path(file_code): axum::extract::Path<String>,
) -> Result<Response, (StatusCode, String)> {
    let upload_dir = "./uploads";

    // Kết nối MongoDB để tìm file
    let db = client.database("file_service");
    let collection = db.collection::<FileUpload>("files");
    let file_doc = collection
        .find_one(doc! { "file_code": &file_code })
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Kiểm tra nếu không tìm thấy file
    let file_doc = match file_doc {
        Some(file) => file,
        None => return Err((StatusCode::NOT_FOUND, "File not found".to_string())),
    };

    // Xác định đường dẫn file
    let file_path = format!("{}/{}", upload_dir, file_code);

    // Kiểm tra nếu file tồn tại
    if !Path::new(&file_path).exists() {
        return Err((StatusCode::NOT_FOUND, "File not found".to_string()));
    }

    // Mở file và đọc nội dung
    let mut file = File::open(&file_path)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Xác định Content-Type dựa vào phần mở rộng
    let content_type = mime_guess::from_ext(&file_doc.file_type)
        .first_or_octet_stream()
        .to_string();

    // Trả về response chứa hình ảnh
    Ok((
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, content_type.clone()),
            (header::CACHE_CONTROL, "no-cache, must-revalidate".to_string()),
        ],
        Bytes::from(buffer),
    )
        .into_response())
}