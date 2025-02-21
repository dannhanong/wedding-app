use axum::Router;
use crate::{
    enums::routes::RoutePath,
    features::file::routes::file_routes as get_file_routes
};
use mongodb::Client;

pub fn create_router() -> Router<Client> {
    let file_routes = get_file_routes();

    let api_routes = Router::new()
        .nest(RoutePath::FILE.get_path(), file_routes);

    Router::new().nest("/api", api_routes)
}