package com.dan.wedding.services.impls;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.stereotype.Service;

import com.dan.wedding.models.PushSubscription;
import com.dan.wedding.services.NotificationService;

import jakarta.annotation.PostConstruct;

import java.security.GeneralSecurityException;
import java.security.Security;

@Service
public class NotificationServiceImpl implements NotificationService {
    private PushService pushService;
    private final String publicKey = "BJGD-ckLwy3LkdYIMFRaZ0cmAZ4-_WNsBxu8cgHVPF3os3vMRUVccPCGvLxXhd-dbcg4sUkdMX5-PxHh8HdfFnE"; // Thay bằng khóa công khai
    private final String privateKey = "94_En00BEqbsJ6xnN3GCLcoNrCb59jnnOL5AZAesHQc"; // Thay bằng khóa riêng

    @PostConstruct
    public void init() {
        Security.addProvider(new BouncyCastleProvider());
        try {
            pushService = new PushService(publicKey, privateKey);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }
    }

    public void sendNotification(PushSubscription subscription, String message) throws Exception {
        nl.martijndwars.webpush.Subscription sub = new nl.martijndwars.webpush.Subscription(
            subscription.getEndpoint(),
            new nl.martijndwars.webpush.Subscription.Keys(subscription.getP256dh(), subscription.getAuth())
        );
        pushService.send(new Notification(sub, message));
    }
}
