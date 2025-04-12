import React from 'react';

const StatCard = ({ title, value }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700">{title}</h2>
            <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
    );
};

export default StatCard;