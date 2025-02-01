package com.dan.wedding.services;

import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Wish;

import java.util.List;

public interface WishService {
    Wish create(Wish wish);
    ResponseMessage delete(String id);
    List<Wish> getAll();
}
