import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import NavItem from './NavItem';
import Header from './Header';

const Layout = ({ children }) => {
    const [activePage, setActivePage] = useState('overview');

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
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
                <nav className="mt-2">
                    <NavItem
                        label="Overview"
                        active={activePage === 'overview'}
                        onClick={() => setActivePage('overview')}
                    />
                    <NavItem
                        label="Models"
                        active={activePage === 'models'}
                        onClick={() => setActivePage('models')}
                    />
                    <NavItem
                        label="Analytics"
                        active={activePage === 'analytics'}
                        onClick={() => setActivePage('analytics')}
                    />
                    <NavItem
                        label="Settings"
                        active={activePage === 'settings'}
                        onClick={() => setActivePage('settings')}
                    />
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