package com.dan.wedding.dtos.requests;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoryRequest {
    String title;
    LocalDate date;
    MultipartFile file;
    String description;
}
