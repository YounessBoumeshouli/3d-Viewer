import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Layout from '../components/user/Layout';
import api from "../services/api.js";
import {Button} from "@/components/ui/button.jsx";
import ModelCard from "../components/user/ModelCard.jsx";

const DesignerPage = () => {
    // This component renders either Image 3 or Image 4 depending on props
    // For simplicity, I'm implementing Image 3 (Youness profile)
    const [designer,setDesinger] = useState(null);
    const [popularModels,setPopularModels] = useState([]);
 const {id} = useParams();
 const fetchUserData = async ()=>{
     try {
         const response = await api.get(`designers/${id}`)
         setDesinger(response.data)
     }catch (error){
         console.error(error)
     }
 }
 const fetchPopularModels = async ()=>{
     try {
         const response = await api.get(`models/designer/${id}`)
         setDesinger(response.data)
     }catch (error){
         console.error(error)
     }
 }
    useEffect(() => {
        fetchUserData();
    }, []);
        console.log(designer)
    if (!designer) {
        return <div>Loading...</div>; // Show loading while fetching data
    }
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
                        <h1 className="text-2xl font-bold">{designer.user.name}</h1>
                        <p className="text-gray-600">Architectural Designer</p>
                        <div className="mt-2">
                            <p className="text-lg font-semibold">4.9</p>
                            <p className="text-gray-600">{designer.social_links[0].url}</p>
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
                        <Button  className="text-blue-600 hover:underline"

                        >View All Models</Button>
                    </div>

                    {/* This would be populated with your ModelCard component */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <ModelCard/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DesignerPage;