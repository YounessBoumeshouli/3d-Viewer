import React from 'react';
import { Bell } from 'lucide-react';
const Header = () => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, Creator!</h1>
                    <p className="text-gray-500">Manage your 3D models and track their performance</p>
                </div>
                <div className="flex items-center">
                    <button className="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100">
                        <Bell size={20} />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Upload New Model
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;