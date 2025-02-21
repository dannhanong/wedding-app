use axum::routing::{post, get};
use axum::Router;
use mongodb::Client;

use super::handler::{preview_image, test_connection, upload_file};

pub fn file_routes() -> Router<Client> {
    Router::new()
        .route("/upload", post(upload_file))
        .route("/preview/{file_code}", get(preview_image))
        .route("/test", get(test_connection))
}