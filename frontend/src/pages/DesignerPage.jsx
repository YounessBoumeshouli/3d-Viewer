import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/user/Layout';

const DesignerPage = () => {
    // This component renders either Image 3 or Image 4 depending on props
    // For simplicity, I'm implementing Image 3 (Youness profile)

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Blue header with profile picture */}
                <div className="bg-blue-600 h-48 rounded-t-lg relative">
                    <div className="absolute -bottom-12 left-12">
                        <img
                            src="/api/placeholder/150/150"
                            alt="Designer profile"
                            className="rounded-full border-4 border-white w-24 h-24"
                        />
                    </div>
                </div>

                {/* Profile information */}
                <div className="mt-16 flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Youness Boumeshouli</h1>
                        <p className="text-gray-600">Architectural Designer</p>
                        <div className="mt-2">
                            <p className="text-lg font-semibold">4.9</p>
                            <p className="text-gray-600">boumeshouliyouness6@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-8">
                        <div className="text-center">
                            <p className="text-xl font-bold">2.3k</p>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">156</p>
                            <p className="text-gray-600">Models</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">12.5k</p>
                            <p className="text-gray-600">Likes</p>
                        </div>
                        <button className="bg-blue-600 text-white rounded-md px-6 py-2">Follow</button>
                    </div>
                </div>

                {/* Popular Models */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Popular Models</h2>
                        <Link to="/models" className="text-blue-600 hover:underline">View All Models</Link>
                    </div>

                    {/* This would be populated with your ModelCard component */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Model cards would go here */}
                        {/* You could map through an array of models */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DesignerPage;