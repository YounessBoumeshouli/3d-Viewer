import React from 'react';
import ChatListItem from './ChatListItem';

function ChatList({ conversations }) {
    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map(conversation => (
                <ChatListItem
                    key={conversation.id}
                    conversation={conversation}
                />
            ))}
        </div>
    );
}

export default ChatList;