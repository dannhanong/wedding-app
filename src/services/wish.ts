import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllWishes = async () => {
    return axios.get(`${baseUrl}/wishes/public/all`);
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
        console.error('Error during wish creation:', error);
        throw error;
    }
};

export const deleteWish = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/wishes/private/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
        return response.data;
    } catch (error) {
        console.error('Error during wish creation:', error);
        throw error;
    }
};