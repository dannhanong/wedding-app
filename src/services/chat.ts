import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL_BOT;

export const chatWithBot = async (message: string) => {
    try {
        const response = await axios.post(`${baseUrl}/chat`, {
            message
        });
        
        return response.data.history[1].content;
    } catch (error) {
        console.error('Error during getMessages:', error);
        throw error;
    }
};