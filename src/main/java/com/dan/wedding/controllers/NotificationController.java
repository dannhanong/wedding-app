package com.dan.wedding.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dan.wedding.models.PushSubscription;
import com.dan.wedding.repositories.PushSubscriptionRepository;
import com.dan.wedding.services.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PushSubscriptionRepository subscriptionRepository; // Repository cho PushSubscription

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody PushSubscription subscription) {
        if (subscriptionRepository.existsByEndpoint(subscription.getEndpoint())) {
            return null;
        }

        subscriptionRepository.save(subscription);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody String message) {
        subscriptionRepository.findAll().forEach(sub -> {
            try {
                notificationService.sendNotification(sub, message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return ResponseEntity.ok("Notifications sent");
    }
}
