use dotenv::dotenv;
use mongodb::{Client, options::ClientOptions};
use std::env;

mod enums;
mod features;
mod router;

use router::create_router;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Lấy connection string từ biến môi trường
    let mongodb_uri = env::var("MONGODB_URI")
        .expect("MONGODB_URI phải được thiết lập trong .env");

    // Cấu hình MongoDB client
    let mut client_options = ClientOptions::parse(&mongodb_uri)
        .await
        .expect("Lỗi khi phân tích connection string");
    client_options.app_name = Some("FileService".to_string());
    let client = Client::with_options(client_options)
        .expect("Lỗi khi khởi tạo MongoDB client");

    // Tạo router
    let app = create_router().with_state(client.clone());

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    print!("Server đang chạy trên http:// {}", listener.local_addr().unwrap());

    // Khởi động server
    axum::serve(listener, app).await.unwrap();
}