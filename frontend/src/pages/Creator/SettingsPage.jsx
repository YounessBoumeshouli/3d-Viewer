import React from 'react';
import FormField from '../../components/Maker/FormField';
import { Mail } from 'lucide-react';
import Layout from "../../components/Maker/Layout.jsx";

const SettingsPage = () => {
    const fetchData = async () =>{
        const response = await api.get('MyProfile');
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
                        <h2 className="text-xl font-bold">Alexa Rawles</h2>
                        <p className="text-gray-500">alexarawles@gmail.com</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <FormField label="Full" placeholder="Your First Name" />
                <FormField label="Nick Name" placeholder="Your First Name" />
                <FormField label="Gender" placeholder="Your First Name" dropdown={true} />
                <FormField label="Country" placeholder="Your First Name" dropdown={true} />
                <FormField label="Language" placeholder="Your First Name" dropdown={true} />
                <FormField label="Time" placeholder="Your First Name" dropdown={true} />
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">My email Address</h3>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md mr-3">
                        <Mail size={16} />
                    </div>
                    <div>
                        <p className="font-medium">alexarawles@gmail.com</p>
                        <p className="text-sm text-gray-500">1 month ago</p>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default SettingsPage;