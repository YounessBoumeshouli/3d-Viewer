import React, { useState } from 'react';
import { Bell, ChevronDown, Search, Star } from 'lucide-react';

const CreatorDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [models, setModels] = useState([
        {
            id: 1,
            name: 'Modern House',
            category: 'house',
            dimensions: '200×150×180',
            uploadDate: '2024-01-15',
            views: 1250,
            rating: 4.5,
            selected: false
        },
        {
            id: 2,
            name: 'Office Chair',
            category: 'furniture',
            dimensions: '60×90×60',
            uploadDate: '2024-01-10',
            views: 850,
            rating: 4.2,
            selected: false
        },
        {
            id: 3,
            name: 'Kitchen Table',
            category: 'furniture',
            dimensions: '150×75×90',
            uploadDate: '2024-01-05',
            views: 650,
            rating: 4.8,
            selected: false
        }
    ]);

    const totalViews = models.reduce((sum, model) => sum + model.views, 0);
    const avgRating = models.reduce((sum, model) => sum + model.rating, 0) / models.length;

    const toggleModelSelection = (id) => {
        setModels(models.map(model =>
            model.id === id ? { ...model, selected: !model.selected } : model
        ));
    };

    const renderOverviewTab = () => (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700">Total Models</h3>
                    <p className="text-3xl font-bold mt-2">{models.length}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700">Total Views</h3>
                    <p className="text-3xl font-bold mt-2">{totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700">Average Rating</h3>
                    <p className="text-3xl font-bold mt-2">{avgRating.toFixed(1)}</p>
                </div>
            </div>
        </div>
    );

    const renderModelsTab = () => (
        <div className="p-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                        <div className="relative">
                            <select className="bg-gray-100 rounded-md py-2 px-4 pr-8 appearance-none">
                                <option>Sort by Date</option>
                                <option>Sort by Views</option>
                                <option>Sort by Rating</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
                        </div>
                        <div className="relative">
                            <select className="bg-gray-100 rounded-md py-2 px-4 pr-8 appearance-none">
                                <option>All Types</option>
                                <option>Furniture</option>
                                <option>House</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-200"
                            />
                        </div>
                        <button className="text-gray-600 hover:underline">Select All</button>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="pb-3"></th>
                        <th className="pb-3 text-left">Model</th>
                        <th className="pb-3 text-left">Dimensions</th>
                        <th className="pb-3 text-left">Upload Date</th>
                        <th className="pb-3 text-left">Views</th>
                        <th className="pb-3 text-left">Rating</th>
                        <th className="pb-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {models.map(model => (
                        <tr key={model.id} className="border-b border-gray-100">
                            <td className="py-4 pr-2">
                                <input
                                    type="checkbox"
                                    checked={model.selected}
                                    onChange={() => toggleModelSelection(model.id)}
                                    className="rounded"
                                />
                            </td>
                            <td className="py-4">
                                <div className="flex items-center">
                                    <div className="bg-gray-200 w-12 h-12 rounded mr-3 flex items-center justify-center text-xs text-gray-500">200 × 200</div>
                                    <div>
                                        <p className="font-medium">{model.name}</p>
                                        <p className="text-gray-500 text-sm">{model.category}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">{model.dimensions}</td>
                            <td className="py-4">{model.uploadDate}</td>
                            <td className="py-4">{model.views}</td>
                            <td className="py-4">
                                <div className="flex items-center">
                                    {model.rating}
                                    <Star className="w-4 h-4 text-yellow-400 ml-1 fill-yellow-400" />
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex gap-2">
                                    <button className="text-blue-500 hover:underline">View</button>
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                    <button className="text-red-500 hover:underline">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAnalyticsTab = () => (
        <div className="p-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Performance Analytics</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                    Analytics visualization will be displayed here
                </div>
            </div>
        </div>
    );

    const renderSettingsTab = () => (
        <div className="p-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                            <img src="/api/placeholder/64/64" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Alexa Rawles</h3>
                            <p className="text-gray-500">alexarawles@gmail.com</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white py-1 px-4 rounded-md">Edit</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="font-medium mb-2">Full</p>
                        <input
                            type="text"
                            placeholder="Your First Name"
                            className="w-full p-2 border border-gray-200 rounded"
                        />
                    </div>
                    <div>
                        <p className="font-medium mb-2">Nick Name</p>
                        <input
                            type="text"
                            placeholder="Your First Name"
                            className="w-full p-2 border border-gray-200 rounded"
                        />
                    </div>
                    <div>
                        <p className="font-medium mb-2">Gender</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your First Name"
                                className="w-full p-2 border border-gray-200 rounded"
                            />
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <p className="font-medium mb-2">Country</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your First Name"
                                className="w-full p-2 border border-gray-200 rounded"
                            />
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <p className="font-medium mb-2">Language</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your First Name"
                                className="w-full p-2 border border-gray-200 rounded"
                            />
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <p className="font-medium mb-2">Time</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your First Name"
                                className="w-full p-2 border border-gray-200 rounded"
                            />
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-medium mb-2">My email Address</p>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <div className="bg-blue-100 p-1 rounded">
                            <span className="text-blue-500">@</span>
                        </div>
                        <div>
                            <p>alexarawles@gmail.com</p>
                            <p className="text-gray-500 text-sm">1 month ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return renderOverviewTab();
            case 'models':
                return renderModelsTab();
            case 'analytics':
                return renderAnalyticsTab();
            case 'settings':
                return renderSettingsTab();
            default:
                return renderOverviewTab();
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {}
            <div className="w-64 border-r border-gray-200 bg-white">
                <div className="p-4 flex items-center">
                    <div className="bg-blue-600 text-white rounded w-8 h-8 flex items-center justify-center font-bold mr-2">
                        3D
                    </div>
                    <h1 className="font-bold text-lg">Creator Dashboard</h1>
                </div>
                <nav className="mt-4">
                    <button
                        className={`w-full text-left px-4 py-3 ${activeTab === 'overview' ? 'bg-gray-100 font-medium' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 ${activeTab === 'models' ? 'bg-gray-100 font-medium' : ''}`}
                        onClick={() => setActiveTab('models')}
                    >
                        Models
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 ${activeTab === 'analytics' ? 'bg-gray-100 font-medium' : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Analytics
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 ${activeTab === 'settings' ? 'bg-gray-100 font-medium' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </nav>
            </div>

            {}
            <div className="flex-1">
                <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, Creator!</h1>
                        <p className="text-gray-500">Manage your 3D models and track their performance</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Upload New Model
                        </button>
                    </div>
                </header>

                {renderContent()}
            </div>
        </div>
    );
};

export default CreatorDashboard;