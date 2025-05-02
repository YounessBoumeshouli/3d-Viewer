import React, {useEffect,useState} from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ModelListItem from '../../components/Maker/ModelListItem.jsx';
import Layout from "../../components/Maker/Layout.jsx";
import api from "../../services/api.js";

const CreatorModelsPage = () => {
    const [models,setModels] = useState([])
    const fetchData = async () =>{
        const response = await api.get('creator/models');
        setModels(response.data.houses)
        console.log(response.data)
    }
    const handleDelete = async (id) =>{
       const response = await api.delete(`houses/${id}`);
      await fetchData();
    }
    useEffect(() => {
        fetchData();
    }, []);
    if (!models){
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
    return (
        <Layout>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                    <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                            <option>Sort by Date</option>
                            <option>Sort by Name</option>
                            <option>Sort by Views</option>
                            <option>Sort by Rating</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                            <option>All Types</option>
                            <option>House</option>
                            <option>Furniture</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-64"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                    </div>
                    <button className="ml-4 text-gray-700 hover:text-gray-900">
                        Select All
                    </button>
                </div>
            </div>

            <table className="w-full">
                <thead>
                <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium"></th>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium">Dimensions</th>
                    <th className="pb-3 font-medium">Upload Date</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Actions</th>
                </tr>
                </thead>
                <tbody>
                {models.map(model => (
                    <ModelListItem key={model.id} model={model} handleDelete = {handleDelete} />
                ))}
                </tbody>
            </table>
        </div>
        </Layout>
    );
};

export default CreatorModelsPage;