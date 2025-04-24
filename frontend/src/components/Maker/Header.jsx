import React, {useEffect, useState} from 'react';
import {BellDot,Bell, ChevronDown, MessageCircle} from 'lucide-react';
import {Link} from "react-router-dom";
import Messages from "../../pages/Messages.jsx";
import pusher from "../../services/pusher.js";
import api from "../../services/api.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
const Header = () => {
    const [notifications , setNotifications] = useState([]);
    const [newNotification , setNewNotification] = useState(null);
    const [userId , setUserId] = useState(null);
    const [messageModel , setMessageModel] = useState(false);
    const fetchNotifications = async ()=>{
        const response = await api.get("notifications");
        setNotifications(response.data)
        console.log(response.data)
    }
    const handleMessageModelClose = () =>{
        setMessageModel(false)
    }
    useEffect(() => {

        const channel = pusher.subscribe('comments-global');
        channel.bind('comment.added', function(data) {
            console.log('message :',data)
            const alertMessage = `New comment: ${data.comment.content}\nSender: ${data.comment.user_id}\nHouse ID: ${data.house_id}`;
            alert(alertMessage);
            setNewNotification(data);
        });
    }, []);
    useEffect(() => {
        if (userId) {
            const channel = pusher.subscribe(`users.${userId}`);
            channel.bind('BroadcastNotificationCreated', function (data) {
                console.log("📢 New Notification:", data);
                alert('hahah');
            });

            return () => {
                pusher.unsubscribe(`users.${userId}`);
            };
        }
    }, [userId]);


    const fetchUser = async ()=>{
        const response = await api.get('MyProfile');
             setUserId(response.data.user_id);
    }
    useEffect(() => {
        fetchUser()
    }, []);
    useEffect(() => {
        fetchNotifications();

    }, [newNotification]);
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, Creator!</h1>
                    <p className="text-gray-500">Manage your 3D models and track their performance</p>
                </div>
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100">
                                { notifications && notifications.length > 0 ? (
                                    <BellDot size={20} />) :
                                    (
                                        <Bell size={20} />
                                    )
                                }
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#242634] border-[#3e435d]/20 text-white">
                            { notifications && notifications.length > 0 ? (
                            notifications.map((not)=>(
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>{not.data.content}</span>
                                </DropdownMenuItem>
                            ))
                            ) : (
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>No new notification yet</span>
                                </DropdownMenuItem>
                            )
                            }

                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                onClick={()=>setMessageModel(true)}
                                    className="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100">
                                <MessageCircle size={20} />
                            </button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <Link to='/3D' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Upload New Model
                    </Link>
                </div>
            </div>
            {
                messageModel &&
                <div className="fixed inset-0 z-50">
                    <Messages onClose = {handleMessageModelClose}/>

                </div>
            }
        </div>
    );
};

export default Header;