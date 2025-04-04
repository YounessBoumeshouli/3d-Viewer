import React from 'react';
import Layout from '../components/user/Layout';

const ModelPage = () => {
    // This renders Image 5 - the model detail page

    return (
        <Layout>
            <div className="bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Main content area */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - viewer */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-gray-200 rounded-lg relative">
                                <div className="aspect-[4/3] flex items-center justify-center">
                                    <p className="text-gray-500 text-4xl">800 × 600</p>
                                </div>
                                {/* Control buttons */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-gray-800 text-white p-2 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button className="bg-gray-800 text-white p-2 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M16.293 2.293a1 1 0 011.414 1.414l-14 14a1 1 0 01-1.414-1.414l14-14z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right side - information */}
                        <div className="w-full lg:w-1/3">
                            {/* Layers panel */}
                            <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                <h3 className="text-lg font-semibold mb-3">Layers</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked className="h-4 w-4" />
                                        <span>Lines</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked className="h-4 w-4" />
                                        <span>Circles</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked className="h-4 w-4" />
                                        <span>Points</span>
                                    </div>
                                </div>
                            </div>

                            {/* Share panel */}
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3">Share</h3>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 p-2 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </button>
                                    <button className="bg-blue-600 p-2 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Model information */}
                    <div className="bg-gray-800 p-6 rounded-lg mt-6">
                        <h2 className="text-2xl font-bold mb-2">Modern House Design</h2>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-400">Dimensions: 200×150×180 cm</p>
                            <p className="text-gray-400">Creator: Sarah Anderson</p>
                        </div>
                        <p className="text-gray-300">A modern house design featuring minimalist architecture with open spaces and natural light integration.</p>
                        <div className="flex items-center mt-4">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2">4.3/5 (120 ratings)</span>
                        </div>
                    </div>

                    {/* Comments section */}
                    <div className="bg-gray-800 p-6 rounded-lg mt-6">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Search comments..."
                                className="bg-gray-700 text-white rounded px-4 py-2 w-full"
                            />
                            <div className="bg-gray-700 text-white rounded px-3 py-2 flex items-center gap-2">
                                <span>Newest First</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-gray-700 rounded mb-4 px-3 py-2 min-h-24">
                            {/* Comment input area */}
                        </div>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Post Comment</button>

                        {/* Comment */}
                        <div className="mt-6 border-t border-gray-700 pt-4">
                            <div className="flex justify-between">
                                <p className="font-medium">Michael Chen <span className="text-gray-400 font-normal">18/03/2025</span></p>
                                <button className="text-blue-400">Reply</button>
                            </div>
                            <p className="mt-2 text-gray-300">
                                Love the modern aesthetic and how the spaces flow together. The natural lighting is particularly well thought out.
                            </p>
                            <div className="flex items-center mt-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span className="ml-1">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ModelPage;