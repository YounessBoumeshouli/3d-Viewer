import React from 'react';
import Layout from '../components/user/Layout';
import { Link } from 'react-router-dom';

const ViewerPage = () => {
    // This renders Image 6 - the 3D viewer page

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header with upload button */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2.002 2.002 0 01-2-2v-4z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">3D Viewer</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/models" className="text-gray-600 hover:text-gray-900">Models</Link>
                        <Link to="/messages" className="text-gray-600 hover:text-gray-900">Messages</Link>
                        <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                        <button className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Upload Model
                        </button>
                    </div>
                </div>

                {/* Featured Models section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Models</h2>
                        <div className="flex gap-4">
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                    <option>All Categories</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                    <option>Most Popular</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Model cards - normally would be components */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <Link to="/model/1">
                                <div className="relative">
                                    <img src="/api/placeholder/400/300" alt="Modern House" className="w-full" />
                                    <button className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium">Modern House</h3>
                                    <div className="flex items-center">
                                        <span className="text-sm">4.5</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <img src="/api/placeholder/24/24" alt="" className="rounded-full w-6 h-6" />
                                    <span className="ml-2 text-sm">John Smith</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <Link to="/model/2">
                                <div className="relative">
                                    <img src="/api/placeholder/400/300" alt="Designer Chair" className="w-full" />
                                    <button className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium">Designer Chair</h3>
                                    <div className="flex items-center">
                                        <span className="text-sm">4.5</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <img src="/api/placeholder/24/24" alt="" className="rounded-full w-6 h-6" />
                                    <span className="ml-2 text-sm">Sarah Wilson</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-12 border-t mt-16">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500">© 2025 3D Viewer. All rights reserved.</p>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
                            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link>
                            <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewerPage;