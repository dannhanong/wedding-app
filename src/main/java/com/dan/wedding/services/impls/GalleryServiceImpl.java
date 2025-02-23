package com.dan.wedding.services.impls;

import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.http_clients.FileServiceClient;
import com.dan.wedding.models.Gallery;
import com.dan.wedding.repositories.GalleryRepository;
import com.dan.wedding.services.FileUploadService;
import com.dan.wedding.services.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class GalleryServiceImpl implements GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private FileServiceClient fileServiceClient;

    @Override
    public Gallery create(MultipartFile file) {
        try {
            String fileCode = fileServiceClient.uploadFile(file).getFileCode();
            Gallery gallery = new Gallery();
            gallery.setFileCode(fileCode);
            return galleryRepository.save(gallery);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Gallery> findAll(Pageable pageable) {
        return galleryRepository.findAll(pageable);
    }

    @Override
    public ResponseMessage delete(String id) {
        return galleryRepository.findById(id).map(gallery -> {
            try {
                fileUploadService.deleteFileByFileCode(gallery.getFileCode());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            galleryRepository.delete(gallery);
            return new ResponseMessage(200, "Xóa ảnh thành công");
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy ảnh"));
    }
}
