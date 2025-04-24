import React, {useEffect, useState} from 'react';
import Message from './Message';

function MessageList({ messages }) {

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
                {messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
        </div>
    );
}

export default MessageList;