self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/flower1.png', // Tùy chọn
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    clients.openWindow('/'); // Mở trang web khi click
});