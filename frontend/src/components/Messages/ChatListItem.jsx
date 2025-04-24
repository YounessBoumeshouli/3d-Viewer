import React from 'react';

function ChatListItem({ conversation }) {
    const { title, avatar, lastMessage, time, bgColor, textColor, active } = conversation;

    return (
        <div className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${active ? 'bg-gray-100' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ${textColor} mr-3 flex-shrink-0`}>
                {avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
            </div>
            {active && (
                <div className="ml-2">
                    <button className="text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatListItem;