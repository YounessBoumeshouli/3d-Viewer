import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';  // Replace with your API URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Get token from localStorage or cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }else {
            config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzNjA0MzMzLCJleHAiOjE3NDM2MDc5MzMsIm5iZiI6MTc0MzYwNDMzMywianRpIjoiYmhwNXV0MHRsRGt2c3MwWCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.UATbh0uxtzBa-n80TTarvID3ZOUAquiQwzIFHYrACEA`;

        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
