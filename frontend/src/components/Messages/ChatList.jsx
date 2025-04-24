import React from 'react';
import ChatListItem from './ChatListItem';

function ChatList({ conversations , setSelectedConversation }) {
    console.log(conversations)
    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map(conversation => (
                <button

                    onClick = {()=>setSelectedConversation(conversation)}
                >

                <ChatListItem
                    key={conversation.id}
                    conversation={conversation}

                />
                </button>
            ))}
        </div>
    );
}

export default ChatList;