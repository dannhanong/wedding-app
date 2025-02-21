const FILE_PATH: &str = "/files";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RoutePath {
    FILE
}

impl RoutePath {
    pub fn get_path(&self) -> &'static str {
        match self {
            RoutePath::FILE => FILE_PATH
        }
    }
}