import React, {useEffect, useState} from 'react';
import FormField from '../../components/Maker/FormField';
import { Mail } from 'lucide-react';
import Layout from "../../components/Maker/Layout.jsx";
import api from "../../services/api.js";

const SettingsPage = () => {
    const [profile,setProfile] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get('MyProfile');
                setProfile(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        let isMounted = true; // Track mounted state

        const fetchData = async () => {
            try {
                const response = await api.get('MyProfile');
                if (isMounted) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []);
    if (!profile){
        return (
            <Layout>
                <div>
                    <div className="bg-gradient-to-r from-blue-100 to-orange-100 h-32 rounded-lg mb-6"></div>

                    <div className="flex justify-between items-start mb-8">
                        <h2>Loading ...</h2>
                    </div>


                </div>
            </Layout>
        );
    }
    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="p-4 bg-red-100 text-red-700 rounded">
                    Error loading profile: {error}
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
        <div>
            <div className="bg-gradient-to-r from-blue-100 to-orange-100 h-32 rounded-lg mb-6"></div>

            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img src="/api/placeholder/64/64" alt="Profile" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-bold">{profile.user.name}</h2>
                        <p className="text-gray-500">{profile.user.email}</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <FormField label="Full" placeholder="Your First Name" value = {profile.user.name}/>
                <FormField label="Nick Name" placeholder="Your First Name" value = {profile.user.name} />
                <FormField label="bio" placeholder="bio" value = {profile.bio}/>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">My email Address</h3>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md mr-3">
                        <Mail size={16} />
                    </div>
                    <div>
                        <p className="font-medium">alexarwles@gmail.com</p>
                        <p className="text-sm text-gray-500">1 month ago</p>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default SettingsPage;