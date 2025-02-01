import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllStories = async () => {
    return axios.get(`${baseUrl}/stories/public/all`);
};

export const createStory = async (title: string, date: string, file: File, description: string) => {
    try {
        const response = await axios.post(`${baseUrl}/stories/private/create`, {
            title,
            date,
            description,
            file
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data'
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
        const response = await axios.put(`${baseUrl}/stories/private/update/${id}`, {
            title,
            date,
            description,
            file
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during story creation:', error);
        throw error;
    }
}

export const deleteStory = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/stories/private/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during story creation:', error);
        throw error;
    }
};