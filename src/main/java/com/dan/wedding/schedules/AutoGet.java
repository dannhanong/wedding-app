package com.dan.wedding.schedules;

import com.dan.wedding.services.GalleryService;
import com.dan.wedding.services.StoryService;
import com.dan.wedding.services.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class AutoGet {
    @Autowired
    private GalleryService galleryService;
    @Autowired
    private StoryService storyService;
    @Autowired
    private WishService wishService;

    @Scheduled(fixedRate = 900000)
    public void autoGet() {
        String order = "desc";
        String id = "id";
        Pageable pageable = PageRequest.of(0, 3, Sort.by(Sort.Direction.fromString(order), id));
        galleryService.findAll(pageable);
        storyService.getAll();
        wishService.getAll();
    }
}
