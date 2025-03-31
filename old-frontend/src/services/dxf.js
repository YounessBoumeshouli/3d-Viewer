import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';  // Replace with your API URL

const dxf = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDxf = async (token) => {
    try {
        const response = await dxf.get('/house', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export default dxf;
