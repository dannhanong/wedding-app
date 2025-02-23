package com.dan.wedding.http_clients;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.dan.wedding.dtos.responses.FileUploadResponse;
import com.dan.wedding.utils.MultipartInputStreamFileResource;

import jakarta.annotation.PostConstruct;
import reactor.core.publisher.Mono;

import org.springframework.http.MediaType;

@Service
public class FileServiceClient {
    private final WebClient.Builder webClientBuilder;
    private WebClient webClient;

    public FileServiceClient(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @PostConstruct
    public void init() {
        this.webClient = webClientBuilder.baseUrl("https://wedding-file.onrender.com").build();
    }

    public FileUploadResponse uploadFile(MultipartFile file) {
        try {
            // Tạo form-data để gửi file
            MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
            formData.add("file", new MultipartInputStreamFileResource(file));

            System.out.println("FileServiceClient.uploadFile: " + file.getOriginalFilename());

            // Gửi POST request tới API FastAPI
            Mono<FileUploadResponse> response = webClient.post()
                    .uri("/api/files/upload")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .bodyValue(formData)
                    .retrieve()
                    .bodyToMono(FileUploadResponse.class);

            // Lấy kết quả phản hồi
            return response.block();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}