import React, {useEffect, useState} from 'react';
import { Bell } from 'lucide-react';
import NavItem from './NavItem';
import Header from './Header';
import { Link, useLocation } from "react-router-dom"
import { connectToReverb, disconnectFromReverb } from '../../services/socket.js'
import pusher from "../../services/pusher.js";
const Layout = ({ children }) => {
    const [activePage, setActivePage] = useState('overview');
    const pathname = location.pathname
    useEffect(() => {

        const channel = pusher.subscribe('comments-global');
        channel.bind('comment.added', function(data) {
            alert(JSON.stringify(data));
        });
    }, []);    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-bold rounded">
                            3D
                        </div>
                        <div className="ml-3">
                            <h1 className="text-xl font-bold">Creator</h1>
                            <h1 className="text-xl font-bold">Dashboard</h1>
                        </div>
                    </div>
                </div>
                <nav className="flex flex-col gap-6">
                    <Link
                        to='/OverView'
                        className={`px-4 py-3 cursor-pointer ${pathname === "/OverView"  ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >

                        <span className="text-gray-700">OverView</span>
                    </Link>
                    <Link
                        to='/SettingsPage'
                        className={`px-4 py-3 cursor-pointer ${pathname === "/SettingsPage"  ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >

                        <span className="text-gray-700">SettingsPage</span>
                    </Link>
                    <Link
                        to='/ModelsPage'
                        className={`px-4 py-3 cursor-pointer ${pathname === "/ModelsPage"  ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >

                        <span className="text-gray-700">ModelsPage</span>
                    </Link>
                    <Link
                        to='/AnalyticsPage'
                        className={`px-4 py-3 cursor-pointer ${pathname === "/AnalyticsPage"  ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >

                        <span className="text-gray-700">AnalyticsPage</span>
                    </Link>

                </nav>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;