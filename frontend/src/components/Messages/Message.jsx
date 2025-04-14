import React from 'react';

function Message({ message }) {
    const { content, time, isUser, sender } = message;

    if (isUser) {
        return (
            <div className="flex justify-end">
                <div className="max-w-md">
                    <div className="bg-gray-200 rounded-2xl rounded-tr-none px-4 py-2 text-gray-800">
                        {content}
                    </div>
                    {time && <div className="text-xs text-gray-500 mt-1 text-right">{time}</div>}
                    {sender && <div className="text-xs text-gray-500 mt-1 text-right">{sender}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0 mr-2" style={{ backgroundImage: `url('/api/placeholder/32/32')` }}></div>
            <div className="max-w-md">
                <div className="bg-blue-100 rounded-2xl rounded-tl-none px-4 py-2 text-gray-800">
                    {content}
                </div>
                {time && <div className="text-xs text-gray-500 mt-1">{time}</div>}
                {sender && <div className="text-xs text-gray-500 mt-1">{sender}</div>}
            </div>
        </div>
    );
}

export default Message;