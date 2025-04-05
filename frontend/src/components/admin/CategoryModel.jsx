"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import api from "./../../services/api.js";


function handleSelect(item,title) {

    console.log("selected item :",item);
    console.log('selected type : ',title)
    localStorage.setItem(title,item.path);
    const storedDoor = localStorage.getItem("door");
    console.log(title,storedDoor)

}

function CategoryModel({ title = 'hello', onClose }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [category,SetCategory] = useState({
        category_name : '',
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category){
            console.error('you should fill the name fieald');
        }
        try {
            const request = await api.post('categories',category,{
                headers : {"Content-Type": "multipart/form-data" }
            })
            console.log(request);
        }catch (e) {
            console.error(e)
        }

    }
    const handleChange = (e) => {
        const {name,value} = e.target;
        SetCategory(prev =>({
            ...prev,
            [name]:value
        }))
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
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:ring focus:ring-blue-200"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        name='category_name'
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter category name"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter category description"
                                        rows="3"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save Category
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CategoryModel

