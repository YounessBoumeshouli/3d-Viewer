import React, {useState} from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function    ChatArea({onClose,conversation,messages}) {
console.log(messages)
    return (
        <div className="w-2/3 flex flex-col">
            <ChatHeader  onClose ={onClose} conversation = {conversation} />
            <MessageList  conversation = {conversation} messages = {messages}  />
            <MessageInput conversation = {conversation} />
        </div>
    );
}

export default ChatArea;