# Stage 1: Build với musl target
FROM rust:1.84-alpine AS builder
WORKDIR /app

# Cài đặt dependencies hệ thống
RUN apk add --no-cache \
    musl-dev \
    openssl-dev \
    && rustup target add x86_64-unknown-linux-musl

# Copy các file manifest trước để tận dụng cache layer
COPY Cargo.toml Cargo.lock ./

# Tạo file main giả để cache dependencies
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Build dependencies
RUN cargo build --release --target x86_64-unknown-linux-musl

# Copy source code thực
COPY src ./src

# Build thực sự
RUN touch src/main.rs && \
    cargo build --release --target x86_64-unknown-linux-musl

# Stage 2: Runtime image
FROM alpine:3.19
WORKDIR /app

# Cài đặt runtime dependencies
RUN apk add --no-cache \
    ca-certificates

# Copy binary
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/file-service /usr/local/bin/

# Copy tệp .env
COPY .env /app/.env

# Security hardening
RUN adduser -D -u 1000 appuser && \
    mkdir -p /app/uploads && \
    chown -R appuser:appuser /app /usr/local/bin/file-service
USER appuser

EXPOSE 3000

CMD ["file-service"]