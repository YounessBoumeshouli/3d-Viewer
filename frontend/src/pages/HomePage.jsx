import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/user/Layout';
import DesignerCard from '../components/user/DesignerCard';
import ModelCard from '../components/user/ModelCard';
import OfferCard from '../components/user/ProjectCard';
import { Button } from "@/components/ui/button.jsx";
import LoginModel from "../components/User/LoginModel.jsx";
import api from "../services/api.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    const [loginModel, setLoginModel] = useState(false);
    const [designers, setDesigners] = useState([]);
    const [models, setModels] = useState([]);

    const closeLoginModel = () => {
        setLoginModel(false);
    };

    const fetchDesigners = async () => {
        const response = await api.get('designers');
        setDesigners(response.data);
    };

    const fetchModels = async () => {
        const response = await api.get('houses');
        setModels(response.data);
    };

    useEffect(() => {
        // Initialize AOS library for scroll animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false
        });

        fetchDesigners();
        fetchModels();

        // Refresh AOS when content loads
        const refreshAOS = setTimeout(() => {
            AOS.refresh();
        }, 500);

        return () => clearTimeout(refreshAOS);
    }, []);

    const offers = [
        {
            id: 1,
            image: '/path/to/project1.jpg',
        },
        {
            id: 2,
            image: '/path/to/project2.jpg',
        },
        {
            id: 3,
            image: '/path/to/project3.jpg',
        },
        {
            id: 4,
            image: '/path/to/project4.jpg',
        }
    ];

    return (
        <Layout>
            {/* Hero Section with Gradient Background */}
            <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                    <div className="w-full md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Creative <span className="text-blue-300">Design</span> Solutions</h1>
                        <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">Bringing your ideas to life through innovative design and cutting-edge 3D modeling.</p>
                        <div className="flex space-x-4">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1" onClick={() => setLoginModel(true)}>
                                Get Started
                            </Button>
                            <Button className="bg-transparent border-2 border-blue-300 text-blue-100 font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2" data-aos="fade-left" data-aos-delay="200">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
                            <img
                                src="/path/to/designer-image.jpg"
                                alt="Designer working on 3D model"
                                className="rounded-2xl shadow-2xl w-full relative z-10 transform hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Designer Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">Our Talent</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet Our <span className="text-blue-600">Designers</span></h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {designers.map((designer, index) => (
                        <div
                            key={designer.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="transform hover:-translate-y-2 transition duration-300"
                        >
                            <DesignerCard designer={designer} />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3D Models Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-16">
                        <div data-aos="fade-right">
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">Latest Work</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">3D <span className="text-indigo-600">Models</span></h2>
                            <div className="w-24 h-1 bg-indigo-600 mt-4"></div>
                        </div>
                        <Link
                            to="/models"
                            className="hidden md:flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition"
                            data-aos="fade-left"
                        >
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {models.map((model, index) => (
                            <div
                                key={model.id}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                className="transform hover:-translate-y-2 transition duration-300"
                            >
                                <ModelCard model={model} creator={model.dxf_file.designer} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center md:hidden">
                        <Link
                            to="/models"
                            className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition"
                        >
                            View All Models
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">Showcase</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our <span className="text-purple-600">Plan</span></h2>
                    <div className="w-24 h-1 bg-purple-600 mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {offers.map((offer, index) => (
                        <div
                            key={offer.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="transform hover:scale-105 transition duration-300"
                        >
                            <OfferCard project={offer} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mt-16 -mr-16"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-50 rounded-full -mb-40 -ml-16"></div>

                <div className="relative max-w-xl mx-auto" data-aos="fade-up">
                    <div className="text-center mb-12">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">Contact</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get in <span className="text-green-600">Touch</span></h2>
                        <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-8 transform hover:shadow-2xl transition duration-300">
                        <form>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {loginModel && (
                <LoginModel
                    onClose={closeLoginModel}
                />
            )}
        </Layout>
    );
};

export default HomePage;