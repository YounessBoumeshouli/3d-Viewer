import React, {useEffect, useState} from "react";

function Home() {

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