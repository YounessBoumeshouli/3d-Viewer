import React from 'react';
import { Star } from 'lucide-react';

const ModelListItem = ({ model }) => {
    return (
        <tr className="border-b border-gray-100">
            <td className="py-4">
                <input type="checkbox" className="rounded text-blue-600" />
            </td>
            <td className="py-4">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded mr-3">
                        <img src={model.thumbnail} alt={model.name} className="w-12 h-12" />
                    </div>
                    <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-gray-500">{model.category}</div>
                    </div>
                </div>
            </td>
            <td className="py-4">{model.dimensions}</td>
            <td className="py-4">{model.uploadDate}</td>
            <td className="py-4">{model.views}</td>
            <td className="py-4">
                <div className="flex items-center">
                    <span className="mr-1">{model.rating}</span>
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
            </td>
            <td className="py-4">
                <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default ModelListItem;