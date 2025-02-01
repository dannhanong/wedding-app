package com.dan.wedding.repositories;

import com.dan.wedding.models.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    Page<Gallery> findAll(Pageable pageable);
}
