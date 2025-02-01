package com.dan.wedding.repositories;

import com.dan.wedding.models.Wish;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishRepository extends MongoRepository<Wish, String> {
}
