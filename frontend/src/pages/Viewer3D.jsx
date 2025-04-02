"use client"

import {useEffect, useState} from "react"
import {Upload, Search, RotateCw, RotateCcw, Move, Square, Circle, Dot} from "lucide-react"
import { Button } from "@/components/ui/button"
import ComponentModal from "../components/Maker/ComponentModel.jsx"
import House from "../pages/house.jsx"
import {DxfParser} from "dxf-parser";
import api from "../services/api.js";
// Component categories

// Component items for each category

function Viewer3D() {
    const [zoom, setZoom] = useState(100)
    const [rotation, setRotation] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [modelLoaded, setModelLoaded] = useState(false)

    const handleCategoryClick = async (categoryId) => {
        console.log("Category clicked:", categoryId);
        setActiveCategory(categoryId)

        setShowModal(true)
        try {
            const response = await api.get('components/'+categoryId);

            console.log("Server Response:", response.data);
            setComponentItems(response.data)
        } catch (error) {
            console.error("Error selecting item:", error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleUpload = () => {
        setModelLoaded(true)
    }
    let [categories, setCategories] = useState([]);
    const [componentItems, setComponentItems] = useState([]);

    useEffect(() => {
        const  fetchCategories = async ()=>{
            try {
                const response = await api.get('components',{
                    responseType:"json"
                });
                console.log(response.data)
                setCategories(response.data);
                console.log(categories)
            }catch (error){
                console.error("Error fetching DXF file:", error);

            }
        }
         fetchCategories();
    }, []);
    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Left sidebar */}
            <div className="w-80 bg-gray-50 p-6 border-r border-gray-200">
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Contrôles</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Search className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="mr-2">Zoom: {zoom}%</span>
                            <button
                                className="px-2 py-1 border border-gray-300 rounded mr-1"
                                onClick={() => setZoom(Math.max(10, zoom - 10))}
                            >
                                -
                            </button>
                            <button
                                className="px-2 py-1 border border-gray-300 rounded"
                                onClick={() => setZoom(Math.min(200, zoom + 10))}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex items-center">
                            <RotateCw className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="mr-2">Rotation: {rotation}°</span>
                            <button
                                className="p-1 border border-gray-300 rounded mr-1"
                                onClick={() => setRotation((rotation - 90) % 360)}
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                            <button className="p-1 border border-gray-300 rounded" onClick={() => setRotation((rotation + 90) % 360)}>
                                <RotateCw className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <Move className="h-5 w-5 text-gray-500 mr-2" />
                            <span>Position</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Calques</h2>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-500 flex items-center justify-center rounded mr-2">
                                <Square className="h-4 w-4 text-white" />
                            </div>
                            <span>Lignes</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-500 flex items-center justify-center rounded mr-2">
                                <Circle className="h-4 w-4 text-white" />
                            </div>
                            <span>Cercles</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-500 flex items-center justify-center rounded mr-2">
                                <Dot className="h-4 w-4 text-white" />
                            </div>
                            <span>Points</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-gray-100 flex items-center justify-center">
                    {modelLoaded ? (
                        <div className="relative w-full h-full">
                        <House/>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="mb-4 bg-gray-200 p-8 rounded-lg inline-flex items-center justify-center">
                                <Square className="h-16 w-16 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-4">Déposez un fichier DXF ou cliquez pour uploader</p>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleUpload}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload DXF
                            </Button>
                        </div>
                    )}
                </div>

                {modelLoaded && (
                    <div className="p-4 bg-white border-t border-gray-200 flex justify-center space-x-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="flex flex-col items-center text-gray-700 hover:text-blue-600"
                                onClick={() => handleCategoryClick(category.type)}
                            >
                                <span className="text-2xl mb-1">{category.type}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showModal && activeCategory && (
                <ComponentModal
                    title={categories.find((c) => c.type === activeCategory).type}
                    items={componentItems}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}

export default Viewer3D

