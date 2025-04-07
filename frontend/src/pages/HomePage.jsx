import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/user/Layout';
import DesignerCard from '../components/user/DesignerCard';
import ModelCard from '../components/user/ModelCard';
import ProjectCard from '../components/user/ProjectCard';
import {Button} from "@/components/ui/button.jsx";
    import LoginModel from "../components/User/LoginModel.jsx";
    import api from "../services/api.js"

const HomePage = () => {
    const  [loginModel , setLoginModel] = useState(false);
    const  [designers , setDesigners] = useState([]);
    const  [models , setModels] = useState([]);
    const closeLoginModel = () => {
        setLoginModel(false)
    }
    const fetchDesigners = async ()=>{
        const response = await api.get('designers');
        setDesigners(response.data);
    }
    const fetchModels = async ()=>{
        const response = await api.get('houses');
        setModels(response.data);
        console.log(response.data)
    }
    useEffect(() => {
        fetchDesigners();
    }, []);
    useEffect(() => {
        fetchModels();

    }, []);
    const portfolioProjects = [
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
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-8 lg:px-16">
                <div className="w-full md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Creative Design Solutions</h1>
                    <p className="text-lg mb-8">Bringing your ideas to life through innovative design and cutting-edge 3D modeling.</p>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setLoginModel(true)}>
                        Get Started
                    </Button>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src="/path/to/designer-image.jpg"
                        alt="Designer working on 3D model"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
            </section>

            {/* Meet Our Designer Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Meet Our Designer</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {designers.map(designer => (

                            <DesignerCard key = {designer.id} designer={designer} />

                    ))}
                </div>
            </section>

            {/* 3D Models Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">3D Models</h2>
                    <Link to="/models" className="text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {models.map(model => (
                            <ModelCard key = {model.id} model={model} />
                    ))}
                </div>
            </section>

            {/* Portfolio Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Portfolio</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {portfolioProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Get in Touch</h2>
                </div>
                <div className="max-w-xl mx-auto">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            {loginModel &&(
                <LoginModel
                    onClose = {closeLoginModel}
                />
            )}
        </Layout>
    );
};

export default HomePage;