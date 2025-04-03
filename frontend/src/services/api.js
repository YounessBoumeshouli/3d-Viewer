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
            config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzNjgxNjU3LCJleHAiOjE3NDM2ODUyNTcsIm5iZiI6MTc0MzY4MTY1NywianRpIjoia2Q4R1lDOERKaVQyTlJHdSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.kuTwmeHJn_BA0sByNlptW8SRFW-9mIR3oMeZJy-bbd4`;      }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
