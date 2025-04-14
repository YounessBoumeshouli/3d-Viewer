import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatArea() {
    const messages = [
        {
            id: 1,
            sender: 'Yo mandem',
            content: 'Cho dey house?',
            time: 'Thursday, Jan 4 • 6:21 PM',
            isUser: false
        },
        {
            id: 2,
            sender: 'Kwasia 😂😂',
            content: 'You dey hung dier you kai say house dey',
            time: '',
            isUser: true
        }
    ];

    return (
        <div className="w-2/3 flex flex-col">
            <ChatHeader />
            <MessageList messages={messages} />
            <MessageInput />
        </div>
    );
}

export default ChatArea;