import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Định nghĩa type cho subscription payload từ backend
interface PushSubscriptionPayload {
    endpoint: string;
    p256dh: string;
    auth: string;
}

// Hàm chuyển đổi base64 sang Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Hàm đăng ký push notification
export async function subscribeToPush(): Promise<void> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.error('Push notifications không được hỗ trợ trên trình duyệt này');
        return;
    }

    try {
        // Đăng ký Service Worker
        const registration: ServiceWorkerRegistration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker đã được đăng ký');

        // Đăng ký subscription
        const subscription: PushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BJGD-ckLwy3LkdYIMFRaZ0cmAZ4-_WNsBxu8cgHVPF3os3vMRUVccPCGvLxXhd-dbcg4sUkdMX5-PxHh8HdfFnE'), // Thay bằng Public Key của bạn
        });

        // Chuyển đổi subscription thành định dạng gửi về backend
        const subscriptionData: PushSubscriptionPayload = {
            endpoint: subscription.endpoint,
            p256dh: Buffer.from(subscription.getKey('p256dh')!).toString('base64'),
            auth: Buffer.from(subscription.getKey('auth')!).toString('base64'),
        };
        const response = await axios.post(`${baseUrl}/api/notifications/subscribe`, subscriptionData);

        if (!response) {
            throw new Error('Không thể gửi subscription đến backend');
        }
        console.log('Subscription đã được gửi đến backend');
    } catch (error) {
        console.error('Lỗi khi đăng ký push notification:', error);
    }
}