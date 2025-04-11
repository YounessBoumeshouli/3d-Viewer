import React from 'react';
import StatCard from './StatCard';

const OverviewPage = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <StatCard title="Total Models" value="3" />
                <StatCard title="Total Views" value="2,750" />
                <StatCard title="Average Rating" value="4.5" />
            </div>
        </div>
    );
};

export default OverviewPage;