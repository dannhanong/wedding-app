package com.dan.wedding.controllers;

import com.dan.wedding.models.Wish;
import com.dan.wedding.services.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishes")
public class WishController {
    @Autowired
    private WishService wishService;

    @GetMapping("/public/all")
    public ResponseEntity<List<Wish>> getAllWishes() {
        return ResponseEntity.ok(wishService.getAll());
    }

    @PostMapping("/public/create")
    public ResponseEntity<Wish> createWish(@RequestBody Wish wish) {
        return ResponseEntity.ok(wishService.create(wish));
    }

    @DeleteMapping("/private/delete/{id}")
    public ResponseEntity<String> deleteWish(@PathVariable("id") String id) {
        return ResponseEntity.ok(wishService.delete(id).getMessage());
    }
}
