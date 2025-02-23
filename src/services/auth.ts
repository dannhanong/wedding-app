import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            username,
            password
        });
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
    }
};

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        return Boolean(localStorage.getItem('accessToken'));
    }
    return false; // Mặc định là chưa đăng nhập khi chạy trên server
};