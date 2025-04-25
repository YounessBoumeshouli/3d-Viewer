import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/user/Layout';
import api from "../services/api.js";
import { Button } from "@/components/ui/button.jsx";
import ModelCard from "../components/user/ModelCard.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

const DesignerPage = () => {
    const [designer, setDesigner] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [popularModels, setPopularModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const checkIsFollowed = async () => {
        try {
            if (designer) {
                const response = await api.get(`followed/${designer.id}`);
                if (response.data.length > 0) {
                    setIsFollowed(true);
                }
            }
        } catch (error) {
            console.error("Error checking follow status:", error);
        }
    };

    const fetchPopularModels = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`designers/${id}/models`);
            setPopularModels(response.data.user.designer.houses);
            setDesigner(response.data.user);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching designer data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            mirror: false
        });

        fetchPopularModels();
    }, [id]);

    useEffect(() => {
        if (designer) {
            checkIsFollowed();
        }
    }, [designer]);

    const handleFollow = async () => {
        try {
            await api.post(`follow/${designer.id}`);
            setIsFollowed(!isFollowed);
        } catch (error) {
            console.error("Error following designer:", error);
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (!designer) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-96">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-700">Designer not found</h3>
                    <p className="mt-2 text-gray-500">We couldn't find the designer you're looking for.</p>
                    <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        Go Home
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                    className="bg-gradient-to-r from-blue-800 to-purple-700 h-64 rounded-xl relative overflow-hidden shadow-xl"
                    data-aos="fade-down"
                >
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                        </svg>
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                    </div>

                    <div className="absolute right-10 bottom-5 opacity-20">
                        <h1 className="text-6xl font-bold text-white tracking-wider">{designer.name.toUpperCase()}</h1>
                    </div>

                    <div className="absolute -bottom left-10" data-aos="fade-up" data-aos-delay="200">
                        <div className="rounded-full border-4 border-white p-1 bg-white shadow-xl">
                            <img
                                src="/api/placeholder/150/150"
                                alt={`${designer.name}'s profile`}
                                className="rounded-full w-32 h-32 object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div data-aos="fade-right" data-aos-delay="300">
                        <h1 className="text-3xl font-bold text-gray-800">{designer.name}</h1>
                        <p className="text-gray-600 mt-1">Architectural Designer</p>
                        <div className="mt-2 flex items-center">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-yellow-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="ml-2 text-lg font-semibold">4.9</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-6 md:mt-0" data-aos="fade-left" data-aos-delay="400">
                        <div className="text-center bg-blue-50 px-4 py-3 rounded-lg">
                            <p className="text-2xl font-bold text-blue-800">2.3k</p>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div className="text-center bg-purple-50 px-4 py-3 rounded-lg">
                            <p className="text-2xl font-bold text-purple-800">156</p>
                            <p className="text-gray-600">Models</p>
                        </div>
                        <div className="text-center bg-indigo-50 px-4 py-3 rounded-lg">
                            <p className="text-2xl font-bold text-indigo-800">12.5k</p>
                            <p className="text-gray-600">Likes</p>
                        </div>
                        <button
                            onClick={handleFollow}
                            className={`${
                                isFollowed
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                            } rounded-lg px-6 py-3 font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex items-center`}
                        >
                            {isFollowed
                                ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Following
                                    </>
                                )
                                : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                        </svg>
                                        Follow
                                    </>
                                )
                            }
                        </button>
                    </div>
                </div>

                <div className="mt-10 bg-white rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-bold mb-3 text-gray-800">About</h3>
                    <p className="text-gray-600">
                        Experienced architectural designer with a passion for creating innovative and sustainable design solutions.
                        Specializing in modern residential architecture with over 10 years of industry experience.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-700">Joined May 2022</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-700">New York, USA</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">Portfolio</span>
                            <h2 className="text-2xl font-bold text-gray-800">Popular Models</h2>
                        </div>
                        <Button
                            className="bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 border border-blue-200 transition duration-300"
                        >
                            View All Models
                        </Button>
                    </div>

                    {popularModels && popularModels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {popularModels.map((model, index) => (
                                <div
                                    key={model.id}
                                    data-aos="zoom-in"
                                    data-aos-delay={100 * index}
                                    className="transform hover:-translate-y-2 transition-all duration-300"
                                >
                                    <ModelCard model={model} creator={designer} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-700">No models available</h3>
                            <p className="text-gray-500 mt-2">This designer hasn't uploaded any models yet.</p>
                        </div>
                    )}
                </div>

                <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm" data-aos="fade-up" data-aos-delay="500">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold text-gray-800">Want to work with {designer.name}?</h3>
                            <p className="text-gray-600 mt-2">Get in touch for custom design collaborations</p>
                        </div>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Contact Designer
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DesignerPage;