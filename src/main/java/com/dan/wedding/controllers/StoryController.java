package com.dan.wedding.controllers;

import com.dan.wedding.dtos.requests.StoryRequest;
import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Story;
import com.dan.wedding.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stories")
public class StoryController {
    @Autowired
    private StoryService storyService;

    @GetMapping("/public/all")
    public ResponseEntity<List<Story>> getAllStories() {
        return ResponseEntity.ok(storyService.getAll());
    }

    @PostMapping("/private/create")
    public ResponseEntity<Story> createStory(@ModelAttribute StoryRequest storyRequest) {
        return ResponseEntity.ok(storyService.create(storyRequest));
    }

    @PutMapping("/private/update/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable("id") String id,
                                             @ModelAttribute StoryRequest storyRequest) {
        return ResponseEntity.ok(storyService.update(id, storyRequest));
    }

    @DeleteMapping("/private/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteStory(@PathVariable("id") String id) {
        return ResponseEntity.ok(storyService.delete(id));
    }
}
