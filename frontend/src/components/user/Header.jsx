import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const path = location.pathname;

    const isHomePage = path === '/';
    const isModelPage = path.includes('/models') && !path.includes('/model/');
    const isViewerPage = path.includes('/viewer');
    const isDesignerPage = path.includes('/designer');

    if (isHomePage) {
        return (
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="font-bold text-lg">BuildIN <span className="text-indigo-600">3D</span></Link>
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                        <Link to="/models" className="text-gray-600 hover:text-gray-900">Models</Link>
                        <Link to="/portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                    </nav>
                </div>
            </header>
        );
    }

    if (isModelPage || isViewerPage) {
        return (
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-black"></div>
                        <span className="font-bold text-lg">3D Models</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/models" className="text-gray-600 hover:text-gray-900">Browse</Link>
                        <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
                        <Link to="/collections" className="text-gray-600 hover:text-gray-900">Collections</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search models..."
                                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="absolute right-2 top-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                        <Link to="/messages" className="text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </Link>
                        <Link to="/profile">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    if (isDesignerPage) {
        return (
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="font-bold text-lg text-indigo-600">Design Folio</Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                        <Link to="/models" className="text-gray-600 hover:text-gray-900">Models</Link>
                        <Link to="/portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</Link>
                    </nav>
                    <div className="flex items-center">
                        <Link to="/profile">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    // Default header for other pages
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg">BuildIn 3D</Link>
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                    <Link to="/models" className="text-gray-600 hover:text-gray-900">Models</Link>
                    <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;