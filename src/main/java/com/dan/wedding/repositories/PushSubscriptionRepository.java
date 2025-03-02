package com.dan.wedding.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dan.wedding.models.PushSubscription;

@Repository
public interface PushSubscriptionRepository extends MongoRepository<PushSubscription, String> {
    boolean existsByEndpoint(String endpoint);
}
