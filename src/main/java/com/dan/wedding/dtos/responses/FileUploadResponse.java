package com.dan.wedding.dtos.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileUploadResponse {
    @JsonProperty("file_name")
    String fileName;

    @JsonProperty("file_type")
    String fileType;

    @JsonProperty("file_size")
    Long fileSize; // Thay int bằng Long để hỗ trợ file lớn hơn

    @JsonProperty("file_code")
    String fileCode;

    @JsonProperty("created_at")
    ZonedDateTime createdAt; // Để ánh xạ thời gian ISO 8601 từ JSON
}