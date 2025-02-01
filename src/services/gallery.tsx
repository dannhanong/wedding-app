import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createGallery = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(`${baseUrl}/galleries/private/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during gallery creation:', error);
        throw error;
    }
};

export const deleteGallery = async (id: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/galleries/private/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during gallery creation:', error);
        throw error;
    }
};

export const getAllGalleries = async (size = 3, page = 0) => {
    const response = await axios.get(`${baseUrl}/galleries/all`, {
        params: {
            size,
            page,
        },
    });

    return response.data;
};