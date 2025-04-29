"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import api from "./../../services/api.js";




function OfferModel({ title = 'Edite Plane', onClose ,offer }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [offerData, setOfferData] = useState({title : '', description :'',price : null});
    const [formData,setFormData] = useState(new FormData());
   const fetchOfferDetails = async ()=>{
       console.log("fetchOfferDetails is working ")
        const response = await api.get(`offers/${offer.string}`);
       console.log(response.data)
        handleOfferData(response.data)

    }
    const handleOfferData =(data)=>{
        setOfferData({
            title: data.title,
            description: data.description,
            price: data.price,
        })
    }
    useEffect(() => {
        console.log(offer.string)
        fetchOfferDetails()
    }, [offer]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !formData.title){
            console.log(formData.type)
            console.error('you should fill the name field');
            return
        }
        const newFormData = new FormData();
        console.log(offer)
        newFormData.append('type',offer.string);
        newFormData.append('title',formData.title);
        if (!offer.integer){
            newFormData.append('price',formData.price);
        }else {
            newFormData.append('price',+0);
        }
        newFormData.append('description',formData.description);

        try {

            const request = await api.post('offers',newFormData,{
            })
            console.log(request);
        }catch (e) {
            console.error('Validation errors:', e.response?.data?.errors);
        }

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setOfferData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-lg">
                            <img
                                src={imagePreview || "/placeholder-image.png"}
                                alt="Category"
                                className="w-3/4 h-auto object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:ring focus:ring-blue-200"
                                        onChange = {(e)=>{
                                            handleImageChange(e);
                                            handleChange(e);
                                        }
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input type='text'
                                           className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           value={offerData.title}
                                           name='title'
                                           onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <input type='text'
                                           className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           name='type'
                                           value={offer.string}
                                           onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <input type='text'
                                           className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           name='description'
                                           value={offerData.description}
                                           onChange={handleChange}
                                    />
                                </div>
                                { offer && offer.integer !== '0' &&
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input type='number'
                                               className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                               placeholder="Enter item dimenions 18x8"
                                               name='price'
                                               value={offerData.price}
                                               onChange={handleChange}
                                        />
                                    </div>
                                }

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default OfferModel

