import React, {useEffect, useState} from "react";
import {getUser} from "../services/api";

function Home() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQyNjk2NTg4LCJleHAiOjE3NDI3MDAxODgsIm5iZiI6MTc0MjY5NjU4OCwianRpIjoid0hMbGdLUDJmRU1sd0ZPVCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.5oR3WgXMz_HzI9czSZp2CXehYWkVvagniSr-20dCWao'); // Get this token from Laravel Breeze after login

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(token);
                setUser(userData.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (token) fetchUser();
    }, [token]);

    return (
        <div className="App">
            {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Home;