package com.dan.wedding.controllers;

import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Gallery;
import com.dan.wedding.services.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/galleries")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @GetMapping("/all")
    public ResponseEntity<Page<Gallery>> getAllPublicGalleries(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "3") int size,
                                                               @RequestParam(defaultValue = "id") String sortBy,
                                                               @RequestParam(defaultValue = "desc") String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order), sortBy));
        return ResponseEntity.ok(galleryService.findAll(pageable));
    }

    @PostMapping(value = "/private/create")
    public ResponseEntity<Gallery> createPrivateGallery(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(galleryService.create(file));
    }

    @DeleteMapping("/private/delete/{id}")
    public ResponseEntity<ResponseMessage> deletePrivateGallery(@PathVariable String id) {
        return ResponseEntity.ok(galleryService.delete(id));
    }
}
