import React from 'react';
import ChatList from './ChatList';
import Header from './Header';

function Sidebar() {
    const conversations = [
        {
            id: 1,
            name: 'Tee💕💕💕',
            avatar: 'T',
            lastMessage: 'Hey whats up',
            time: '15 Min',
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-500'
        },
        {
            id: 2,
            name: 'Zeepay',
            avatar: 'Z',
            lastMessage: 'Hi Neequaye Kotey...',
            time: '12:36 PM',
            bgColor: 'bg-yellow-400',
            textColor: 'text-white'
        },
        {
            id: 3,
            name: 'CloudOTP',
            avatar: 'C',
            lastMessage: '798508 is your veri...',
            time: '12:36 PM',
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-500'
        },
        {
            id: 4,
            name: 'Gatekeeper',
            avatar: 'GK',
            lastMessage: 'Welcome to Our G...',
            time: '12:36 PM',
            bgColor: 'bg-blue-400',
            textColor: 'text-white'
        },
        {
            id: 5,
            name: 'MyMTN 2.0',
            avatar: 'M',
            lastMessage: 'Y\'ello MTNer, do...',
            time: '12:36 PM',
            bgColor: 'bg-yellow-400',
            textColor: 'text-white'
        },
        {
            id: 6,
            name: 'Mama K 😍😍😍',
            avatar: 'MK',
            lastMessage: 'Where is you fath...',
            time: '12:36 PM',
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        },
        {
            id: 7,
            name: 'Nana',
            avatar: 'N',
            lastMessage: 'yo man, food dey...',
            time: '12:36 PM',
            bgColor: 'bg-red-500',
            textColor: 'text-white',
            active: true
        },
        {
            id: 8,
            name: 'VodaCash',
            avatar: 'VC',
            lastMessage: 'Payment of GHS 3...',
            time: '12:36 PM',
            bgColor: 'bg-pink-50',
            textColor: 'text-red-500'
        },
        {
            id: 9,
            name: 'Bunda',
            avatar: 'B',
            lastMessage: 'Amber where are...',
            time: '12:36 PM',
            bgColor: 'bg-blue-500',
            textColor: 'text-white'
        }
    ];

    return (
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <Header />
            <div className="px-4 py-3">
                <button className="flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Start Chat
                </button>
            </div>
            <ChatList conversations={conversations} />
        </div>
    );
}

export default Sidebar;