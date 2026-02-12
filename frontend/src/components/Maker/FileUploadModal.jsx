"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useEffect,useState} from "react";
import api from "./../../services/api.js";



function FileUploadModel({ title = 'Upload a new File', onClose }) {
    const [modelFile,setModelFile] = useState(null);
    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setModelFile(file)
            console.log(file)
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault(); 

        if (!modelFile) {
            console.error("No file selected");
            return;
        }
        try {
            console.log(modelFile)
            const formData = new FormData();
            formData.append("file", modelFile);
            formData.append("type", 0);

            const response = await api.post('upload', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

        }catch (error){
            console.error(error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    {}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        {}
                        <div className="flex flex-col justify-center">
                            <form className="space-y-4">
                                {}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Upload new File
                                    </label>
                                    <input
                                        type="file"
                                        className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:ring focus:ring-blue-200"
                                        onChange={handleFileChange}

                                    />
                                </div>

                                {}

                                {}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                    onClick={handleSubmit}
                                >
                                    Save file
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default FileUploadModel

