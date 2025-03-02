package com.dan.wedding.services;

import org.springframework.stereotype.Service;

import com.dan.wedding.models.PushSubscription;

@Service
public interface NotificationService {
    void sendNotification(PushSubscription subscription, String message) throws Exception;
}
