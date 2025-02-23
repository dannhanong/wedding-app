import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getAccessToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
};

export const getAllStories = async () => {
    return axios.get(`${baseUrl}/stories/public/all`);
};

export const createStory = async (title: string, date: string, file: File, description: string) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('file', file);

        const response = await axios.post(`${baseUrl}/stories/private/create`, formData, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during story creation:', error);
        throw error;
    }
};

export const updateStory = async (id: string, title: string, date: string, file: File | null, description: string) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('date', date);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }

        const response = await axios.put(`${baseUrl}/stories/private/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during story update:', error);
        throw error;
    }
};

export const deleteStory = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/stories/private/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during story deletion:', error);
        throw error;
    }
};