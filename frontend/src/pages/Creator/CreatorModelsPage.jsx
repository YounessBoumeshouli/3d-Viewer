import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ModelListItem from '../../components/Maker/ModelListItem.jsx';
import Layout from "../../components/Maker/Layout.jsx";

const CreatorModelsPage = () => {
    const models = [
        {
            id: 1,
            name: 'Modern House',
            category: 'house',
            dimensions: '200×150×180',
            uploadDate: '2024-01-15',
            views: 1250,
            rating: 4.5,
            thumbnail: '/api/placeholder/50/50'
        },
        {
            id: 2,
            name: 'Office Chair',
            category: 'furniture',
            dimensions: '60×90×60',
            uploadDate: '2024-01-10',
            views: 850,
            rating: 4.2,
            thumbnail: '/api/placeholder/50/50'
        },
        {
            id: 3,
            name: 'Kitchen Table',
            category: 'furniture',
            dimensions: '150×75×90',
            uploadDate: '2024-01-05',
            views: 650,
            rating: 4.8,
            thumbnail: '/api/placeholder/50/50'
        }
    ];

    return (
        <Layout>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                    <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                            <option>Sort by Date</option>
                            <option>Sort by Name</option>
                            <option>Sort by Views</option>
                            <option>Sort by Rating</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                            <option>All Types</option>
                            <option>House</option>
                            <option>Furniture</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-64"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                    </div>
                    <button className="ml-4 text-gray-700 hover:text-gray-900">
                        Select All
                    </button>
                </div>
            </div>

            <table className="w-full">
                <thead>
                <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium"></th>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium">Dimensions</th>
                    <th className="pb-3 font-medium">Upload Date</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Actions</th>
                </tr>
                </thead>
                <tbody>
                {models.map(model => (
                    <ModelListItem key={model.id} model={model} />
                ))}
                </tbody>
            </table>
        </div>
        </Layout>
    );
};

export default CreatorModelsPage;