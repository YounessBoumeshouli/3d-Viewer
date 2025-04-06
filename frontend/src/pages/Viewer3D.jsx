"use client"

import {useEffect, useState} from "react"
import {Upload, Search, RotateCw, RotateCcw, Move, Square, Circle, Dot} from "lucide-react"
import { Button } from "@/components/ui/button"
import ComponentModal from "../components/Maker/ComponentModel.jsx"
import House from "../pages/house.jsx"
import {DxfParser} from "dxf-parser";
import api from "../services/api.js";
import FileUploadModal from "../components/Maker/FileUploadModal.jsx";

function Viewer3D() {
    const [zoom, setZoom] = useState(100)
    const [rotation, setRotation] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [activeCategory, setActiveCategory] = useState(null)
    const [modelLoaded, setModelLoaded] = useState(false)
    const [dxfFiles, setDxfFiles] = useState([])
    const [fileListVisible, setFileListVisible] = useState(false)
    const [fileUploadVisible, setFileUploadVisible] = useState(false)
    const [categories, setCategories] = useState([]);
    const [componentItems, setComponentItems] = useState([]);
    const [models,setModels] = useState([]);
    const [isExistingModel,setIsExistingModel] = useState(false);
    const [selectedModel,setSelectedModel] = useState(null);
    const [savedComponent,setSavedComponents] = useState([])
    const handleCategoryClick = async (category) => {
        console.log("Category clicked:", category.id);
        setActiveCategory(category.name)

        setShowModal(true)
        try {
            const response = await api.get('components/'+category.id);
            console.log("Server Response:", response.data);
            setComponentItems(response.data)
        } catch (error) {
            console.error("Error selecting item:", error);
        }
    }
       const handleSelectedModel = (id) =>{
           setSelectedModel(id);
           console.log(isExistingModel);
       }
        const handleSaveModel = async () => {

            console.log('########## category', categories);
         const components =   categories.map((category)=>(
             {
                 path: localStorage.getItem(category.name)
             }

            ))
            console.log('########## components', components);
            if (isExistingModel){
                console.log(selectedModel)
            }else{
            try {
                console.log("dxf_file_id",selectedFile.id)
                console.log("components",components)

                const response = await api.post('houses',{
                    "dxf_file_id":selectedFile.id,
                    "components":components
                },)
            }catch (e) {
                console.error(e)
            }
            }
        }

    const handleCloseModal = () => {
        setShowModal(false)
        setFileUploadVisible(false)
    }
    useEffect(() => {
        const fetchCeatorModels = async ()=>{
            try {
                const response = await api.get('creator/models')
                console.log(response.data[0].houses)
                setModels(response.data[0].houses)
            }catch (e) {
                console.error(e)
            }
        }
        fetchCeatorModels();
    }, []);
    useEffect(() => {
        console.log(selectedModel)
        if (selectedModel){
            setIsExistingModel(true);
        }
    }, [selectedModel]);
    const handleUpload = async () => {
        try {
            console.log('is trying to fetch the data')
            const response = await api.get('myfiles', {
                responseType: "json"
            });
            console.log('dxfFiles',response.data)
            setDxfFiles(response.data);
            setFileListVisible(true);
            setModelLoaded(true);
        } catch (error) {
            console.error("Error fetching DXF file:", error);
        }
    }

    const uploadFile = async (selectedFilePath) => {
        console.log(selectedFilePath.path)
        try {
            const response = await api.get(`files/${selectedFilePath.path}`, {
                responseType: "json"
            });
            console.log(' ############### file      :',selectedFilePath);
            setSelectedFile(selectedFilePath);
            setFileListVisible(false); // Hide the file list
        } catch (error) {
            console.error("Error fetching DXF file:", error);
        }
    }
    useEffect(()=>{
        console.log(selectedModel);
        const fetchExistingModel = async ()=>{
            if (isExistingModel){
                console.log('checking')
                try {
                    const response = await api.get(`houses/${selectedModel}`);
                    setSavedComponents(response.data.components)
                    setModelLoaded(true)
                    uploadFile(response.data.dxf_file)
                    console.log(response.data.components)
                }catch (e) {
                    console.error(e)
                }
            }


        }
        console.log(savedComponent)
        fetchExistingModel();
    },[isExistingModel])
    useEffect(() => {
        const fetchCategories = async () => {
            console.log('fetch categories')
            try {
                const response = await api.get('categories', {
                    responseType: "json"
                });
                console.log(response.data)
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchModels = async () => {
            console.log('fetch categories')
            try {
                const response = await api.get('creator/models', {
                    responseType: "json"
                });
                console.log(response.data)
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
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
                <div>
                    <h2 className="text-lg font-semibold mb-4">Models</h2>
                    {models.map((model)=>(
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-blue-500 flex items-center justify-center rounded mr-2">
                                    <Dot className="h-4 w-4 text-white" />
                                </div>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700"
                                        onClick={()=>handleSelectedModel(model.id)}

                                >{model.id}</Button>

                            </div>
                        </div>
                        ))



                    }
                </div>

            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-gray-100 flex items-center justify-center">
                    {modelLoaded ? (

                        <div className="relative w-full h-full">
                            {fileListVisible ? (
                                <div className="p-4 flex flex-col items-center">
                                    <h2 className="text-xl mb-4">Select a DXF File</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {dxfFiles.map((dxfFile) => (
                                            <button
                                                key={dxfFile.id}
                                                className="p-4 border rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                                                onClick={() => uploadFile(dxfFile)}
                                            >
                                                <span>{dxfFile.path}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => setFileUploadVisible(true)  }
                                    >
                                        Upload a new DXF File
                                    </button>                                </div>

                                ) : (
                                selectedFile && savedComponent ? (
                                    <div className="relative w-full h-full" style={{ overflow: 'hidden' }}>
                                        <House file={selectedFile.path} components = {savedComponent} />
                                        <button
                                            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                            onClick={() => setFileListVisible(true)}
                                        >
                                            Choose Another File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-500 mb-4">No file selected. Please select a file.</p>
                                        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setFileListVisible(true)}>
                                            Choose DXF File
                                        </Button>
                                    </div>
                                )
                            )}
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
                                onClick={() => handleCategoryClick(category)}
                            >
                                <span className="text-2xl mb-1">{category.name}</span>
                            </button>
                        ))}
                    </div>

                )}
                {
                    selectedFile &&
                <button
                    className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleSaveModel}
                >
                    <span className="text-2xl mb-1">Save</span>
                </button>

                }
            </div>


            {showModal && activeCategory && (
                <ComponentModal
                    title={categories.find((c) => c.name === activeCategory)?.type || activeCategory}
                    items={componentItems}
                    onClose={handleCloseModal}
                />
            )}
            {fileUploadVisible && (
                <FileUploadModal
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}

export default Viewer3D