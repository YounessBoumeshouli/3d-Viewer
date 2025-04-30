import React from 'react';
import Layout from "../../components/Maker/Layout.jsx";

const CreatorAnalyticsPage = () => {
    const fetchInfos = async ()=>{
        const response = await  api.get('MyProfile')
    }
    return (
        <Layout>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Performance Analytics</h2>
            <div className="border border-gray-200 rounded-lg p-20 flex items-center justify-center text-gray-500">
                Analytics visualization will be displayed here
            </div>
        </div>
        </Layout>
    );
};

export default CreatorAnalyticsPage;
