import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            username,
            password
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('accessToken');
};

export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('accessToken'));
};