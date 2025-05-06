"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import api from "./../../services/api.js";


function UserModel(item,title) {

    console.log("selected item :",item);
    console.log('selected type : ',title)
    localStorage.setItem(title,item.path);
    const storedDoor = localStorage.getItem("door");
    console.log(title,storedDoor)

}

function ItemModel({ title = 'hello', onClose ,category }) {
    console.log(category.id)
    const [imagePreview, setImagePreview] = useState(null);
    const [formData,setFormData] = useState(new FormData())
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.dimensions || !formData.price ||!formData.name){
            console.error('you should fill the name field');
            return
        }
        const newFormData = new FormData();
        newFormData.append('type',category.id);
        newFormData.append('dimensions',formData.dimensions);
        newFormData.append('price',formData.price);
        newFormData.append('file',formData.file);
        newFormData.append('name',formData.name);

        try {
            const request = await api.post('upload',newFormData,{
                headers : {"Content-Type": "multipart/form-data" }
            })
            console.log(request);
        }catch (e) {
            console.error(e)
        }

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleChange = (e) => {
        const {name,value,type,files} = e.target;
        if (type === 'file'){
            setFormData(prev =>({
                ...prev,
                [name]:files[0]
            }))
        }else {
            setFormData(prev =>({
                ...prev,
                [name]:value
            }))
        }
        console.log(formData);
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

                        {/* Right Side (Form) */}
                        <div className="flex flex-col justify-center">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Image Upload */}
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
                                        Dimensions
                                    </label>
                                    <input type='text'
                                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           name='dimensions'
                                           onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input type='text'
                                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           name='name'
                                           onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input type='number'
                                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                           placeholder="Enter item dimenions 18x8"
                                           name='price'
                                           onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save {category.name}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserModel

