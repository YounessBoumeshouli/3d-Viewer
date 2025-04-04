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
            config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNzQzNzkzMzkwLCJleHAiOjE3NDM3OTY5OTAsIm5iZiI6MTc0Mzc5MzM5MCwianRpIjoiSUJ0bzNEeWVpVEdtazNaYSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.lcIQ-j-WAuBb7TpSR_XjBeXUG8BSVO4HYAG1ub8CSd8`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
