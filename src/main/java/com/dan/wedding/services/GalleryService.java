package com.dan.wedding.services;

import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface GalleryService {
    Gallery create(MultipartFile file);
    Page<Gallery> findAll(Pageable pageable);
    ResponseMessage delete(String id);
}
