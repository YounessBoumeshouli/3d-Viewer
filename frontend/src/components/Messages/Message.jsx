import React from 'react';

function Message({ message }) {
    console.log(message);
const name = message.user.name
        return (
            <div className="flex justify-end">
                <div className="max-w-md">
                    <div className="bg-gray-200 rounded-2xl rounded-tr-none px-4 py-2 text-gray-800">
                        {message.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{message.created_at}</div>
                     <div className="text-xs text-gray-500 mt-1 text-right">{name}</div>
                </div>
            </div>
        );

}

export default Message;