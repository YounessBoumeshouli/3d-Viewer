import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Messages/Sidebar.jsx';
import ChatArea from '../components/Messages/ChatArea';
import {X} from "lucide-react";
import api from '../services/api.js'
    import pusher from "../services/pusher.js";

function Messages({onClose}) {
    const [selectedConversation, setSelectedConversation] = useState({});
    const [messages , setMessages] = useState([])
    const [conversations , setConversations ] = useState([]);

    const fetchMessages = async (id)=>{
        const response = await api.get(`conversations/${id}`);
        setMessages(response.data)
    }
    useEffect(() => {
        console.log(selectedConversation)

            fetchMessages(selectedConversation.id);

    }, [selectedConversation]);
    const fetchConversations = async ()=>{
        const response = await api.get('conversations');
        setConversations(response.data)
    }
    useEffect(() => {

    fetchConversations();
    }, []);
    useEffect(() => {
        if (conversations && conversations.length > 0) {
            const channels = [];

            conversations.forEach((conversation) => {
                const channelName = `private-conversation.${conversation.id}`;
                const channel = pusher.subscribe(channelName);

                console.log("✅ Subscribed to:", channelName);

                channel.bind('BroadcastMessageSent', (data) => {
                    console.log(data)
                    try {

                        let messageData;

                        if (typeof data === 'object' && data !== null) {
                            messageData = data;
                        } else if (typeof data === 'string') {
                            try {
                                messageData = JSON.parse(data.message);
                            } catch (parseError) {
                                messageData = { content: data.message, type: 'text' };
                            }
                        } else {
                            messageData = { content: String(data.message), type: 'text' };
                        }

                        console.log("📢 Processed message:", messageData);

                        if (conversation.id === selectedConversation.id) {
                            console.log(messageData);
                            setMessages((prevMessages) => [...prevMessages, data.message]);
                        }
                    } catch (e) {
                        console.error("❌ Error handling data:", e);
                    }
                });
                channels.push(channel);
            });

            return () => {
                channels.forEach((channel) => {
                    pusher.unsubscribe(channel.name);
                    console.log("🧹 Unsubscribed from:", channel.name);
                });
            };
        }
    }, [conversations, selectedConversation]);
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex  w-full max-w-6xl mx-auto bg-white shadow-lg">
                <Sidebar setSelectedConversation = {setSelectedConversation}  conversations={conversations} />
                <ChatArea onClose ={onClose} messages = {messages} conversation = {selectedConversation} />
            </div>
        </div>
    );
}

export default Messages;