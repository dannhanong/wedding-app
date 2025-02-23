import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
});

export const getAllWishes = async () => {
    try {
        const response = await axios.get(`${baseUrl}/wishes/public/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wishes:', error);
        throw error;
    }
};

export const createWish = async (name: string, message: string, roleFriend: boolean) => {
    try {
        const response = await axios.post(`${baseUrl}/wishes/public/create`, {
            name,
            message,
            roleFriend
        });
        return response.data;
    } catch (error) {
        console.error('Error creating wish:', error);
        throw error;
    }
};

export const deleteWish = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/wishes/private/delete/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting wish:', error);
        throw error;
    }
};