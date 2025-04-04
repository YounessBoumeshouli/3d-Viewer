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
            config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzNzY4NDE1LCJleHAiOjE3NDM3NzIwMTUsIm5iZiI6MTc0Mzc2ODQxNSwianRpIjoiakd3OU1xcUJ1NEhYSHljVyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.IjpzvRoeICy3rLk1uF72tgcxszoqGkvg-gcjNpG4eSk`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
