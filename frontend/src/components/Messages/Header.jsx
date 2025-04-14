import React from 'react';

function Header() {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="flex items-center ml-4">
                    <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                    <span className="font-medium">Messages</span>
                </div>
            </div>
            <div>
                <button className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('/api/placeholder/32/32')` }}></button>
            </div>
        </div>
    );
}

export default Header;