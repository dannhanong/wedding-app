package com.dan.wedding.repositories;

import com.dan.wedding.models.FileUpload;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileUploadRepository extends MongoRepository<FileUpload, String> {
    void deleteByFileCode(String fileCode);
    FileUpload findByFileCode(String fileCode);
}
