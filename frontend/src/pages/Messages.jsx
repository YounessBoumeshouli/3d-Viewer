import React from 'react';
import Sidebar from '../components/Messages/Sidebar.jsx';
import ChatArea from '../components/Messages/ChatArea';

function Messages() {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex  w-full max-w-6xl mx-auto bg-white shadow-lg">
                <Sidebar />
                <ChatArea />
            </div>
        </div>
    );
}

export default Messages;