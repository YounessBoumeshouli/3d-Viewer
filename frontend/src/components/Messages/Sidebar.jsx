import React, {useEffect, useState} from 'react';
import ChatList from './ChatList';
import Header from './Header';
import api from '../../services/api.js'
import StartChatModel from "./StartChatModel.jsx";
function Sidebar({setSelectedConversation,conversations}) {
    const [ChatModel , setChatModel ] = useState(false);
    useEffect(() => {
        const fetchFriends = async ()=>{
            const response = await api.get('friends');
            setFriends(response.data)
        }
        fetchFriends();



    }, []);
    return (
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <Header />
            <div className="px-4 py-3">
                <button onClick={()=>setChatModel(true)} className="flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Start Chat
                </button>
            </div>
            {
                ChatModel && <StartChatModel onClose={()=>setChatModel(false)}/>
            }
            <ChatList conversations={conversations} setSelectedConversation = {setSelectedConversation} />
        </div>
    );
}

export default Sidebar;