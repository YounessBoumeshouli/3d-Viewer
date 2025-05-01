"use client"

import { useEffect, useState } from "react"
import {
    Upload,
    Search,
    RotateCw,
    RotateCcw,
    Move,
    Square,
    Circle,
    Dot,
    Plus,
    Minus,
    FileIcon,
    ChevronLeft,
    ChevronRight,
    Save,
    Layers,
    Settings,
    Home
} from "lucide-react"
import { setItem, getItem } from '../services/localstorage.js';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import ComponentModal from "../components/Maker/ComponentModel.jsx"
import House from "../pages/house.jsx"
import { DxfParser } from "dxf-parser"
import api from "../services/api.js"
import FileUploadModal from "../components/Maker/FileUploadModal.jsx"
import Loader from '../components/Maker/Loader.jsx'
function Viewer3D() {
    const [height, setHeight] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [activeCategory, setActiveCategory] = useState(null)
    const [modelLoaded, setModelLoaded] = useState(false)
    const [dxfFiles, setDxfFiles] = useState([])
    const [fileListVisible, setFileListVisible] = useState(false)
    const [fileUploadVisible, setFileUploadVisible] = useState(false)
    const [categories, setCategories] = useState([])
    const [componentItems, setComponentItems] = useState([])
    const [models, setModels] = useState([])
    const [isExistingModel, setIsExistingModel] = useState(false)
    const [selectedModel, setSelectedModel] = useState(null)
    const [savedComponent, setSavedComponents] = useState([])
    const [planInfos, setPlanInfos] = useState({})
    const [userInfos, setUserInfos] = useState({})

    const handleCategoryClick = async (category) => {
        setActiveCategory(category.name)
        setShowModal(true)
        try {
            const response = await api.get('components/' + category.id)
            setComponentItems(response.data)
        } catch (error) {
            console.error("Error selecting item:", error)
        }
    }

    const handleSelectedModel = (id) => {
        setSelectedModel(id)
    }
    const fetchCreatorInfo = async () =>{
        const response = await api.get('MyProfile');
        setPlanInfos(response.data.useroffer.offer);
        setUserInfos(response.data)
        console.log(response.data);
    }


    const handleSaveModel = async () => {
        const components = categories.filter(category=>localStorage.getItem(category.name) != null).map((category) => ({
            path: localStorage.getItem(category.name)
        }))

        if (isExistingModel) {

            try {
                const response = await api.put(`houses/${selectedModel}`, {
                    "components": components,
                    "stage": height
                })
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                const dataToSend = components.length > 0 ? components : null;

                const response = await api.post('houses', {
                    "dxf_file_id": selectedFile.id,
                    "components": dataToSend,
                    "stage": height
                })
                if (response) {
                    console.log(response.data);
                } else {
                    console.error('No response received');
                }
                handleSelectedModel(()=>response.data.house_id)
                fetchCreatorModels();
                fetchCreatorInfo();
            } catch (e) {
                console.error(e)
            }
        }

    }

    const handleCloseModal = () => {
        setShowModal(false)
        setFileUploadVisible(false)
    }

        const fetchCreatorModels = async () => {
            try {
                const response = await api.get('creator/models')
                setModels(response.data.houses)
                console.log(response.data.houses)
            } catch (e) {
                console.error(e)
            }
        }
    useEffect(() => {
        fetchCreatorModels()
        fetchCreatorInfo();
    }, [])

    useEffect(() => {
        if (selectedModel) {
            setIsExistingModel(true)
        }
    }, [selectedModel])

    const handleUpload = async () => {
        if (models.length <= planInfos.models){

        }else {

        try {
            const response = await api.get('myfiles')
            setDxfFiles(response.data)
            console.log(response.data)
            setFileListVisible(true)
            setModelLoaded(true)
        } catch (error) {
            console.error("Error fetching DXF file:", error)
        }
        }
    }

    const uploadFile = async (selectedFilePath) => {
        try {
            const response = await api.get(`files/${selectedFilePath.path}`, {
                responseType: "json"
            })
            setSelectedFile(selectedFilePath)
            setFileListVisible(false)
        } catch (error) {
            console.error("Error fetching DXF file:", error)
        }
    }

    useEffect(() => {
        const fetchExistingModel = async () => {
            if (isExistingModel) {
                try {
                    const response = await api.get(`houses/${selectedModel}`)
                    setSavedComponents(response.data.components)
                    setModelLoaded(true)
                    setHeight(response.data.stage)
                    uploadFile(response.data.dxf_file)
                    console.log(response.data)

                } catch (e) {
                    console.error(e)
                }
            }
        }
        fetchExistingModel()
    }, [isExistingModel])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('categories', {
                    responseType: "json"
                })
                setCategories(response.data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-80 bg-white shadow-lg p-6 space-y-8 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Home className="h-6 w-6 text-blue-600" />
                    <h1 className="text-xl font-bold text-gray-800">3D House Maker</h1>
                </div>

                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Settings className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-800">Controls</h2>
                    </div>
                    <div className="space-y-5 pl-2">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Search className="h-4 w-4 text-blue-600 mr-2" />
                                    <span className="text-gray-700 font-medium">Height</span>
                                </div>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                    {height} floors
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <Button
                                    className="flex-1 mr-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                                    onClick={() => setHeight(Math.max(1, height - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Button
                                    className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                                    onClick={() => setHeight(Math.min(5, height + 1))}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <RotateCw className="h-4 w-4 text-blue-600 mr-2" />
                                    <span className="text-gray-700 font-medium">Rotation</span>
                                </div>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                    {rotation}°
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <Button
                                    className="flex-1 mr-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                                    onClick={() => setRotation((rotation - 90) % 360)}
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                                <Button
                                    className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                                    onClick={() => setRotation((rotation + 90) % 360)}
                                >
                                    <RotateCw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <Move className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-gray-700 font-medium">Position</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className="col-start-2">
                                    <Button className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md">
                                        <ChevronLeft className="h-4 w-4 rotate-90" />
                                    </Button>
                                </div>
                                <div className="col-span-3 grid grid-cols-3 gap-2">
                                    <Button className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md">
                                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                    </Button>
                                    <Button className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="col-start-2">
                                    <Button className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md">
                                        <ChevronLeft className="h-4 w-4 -rotate-90" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Layers className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-800">Storage : {planInfos.storage} MB available</h2>
                    </div>

                        <Loader used = {userInfos.storage_size} max = {planInfos.storage} />
                </div>

                {models.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Home className="h-5 w-5 text-blue-600 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-800">My Models</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {models.length}/{planInfos.models}
                            </span>
                        </div>
                        <div className="space-y-2 pl-2 max-h-64 overflow-y-auto pr-2">
                            {models.map((model) => (
                                <div
                                    key={model.id}
                                    className={`flex items-center bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer ${
                                        selectedModel === model.id ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200'
                                    }`}
                                    onClick={() => handleSelectedModel(model.id)}
                                >
                                    <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-md mr-3">
                                        <Home className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-gray-700 font-medium">Model #{model.id}</span>
                                        <p className="text-xs text-gray-500">Last modified: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col relative">
                <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    {modelLoaded ? (
                        <div className="relative w-full h-full">
                            {fileListVisible ? (
                                <div className="p-6 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">Select a DXF File</h2>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 border-none"
                                            onClick={() => setFileUploadVisible(true)}
                                        >
                                            <Upload className="h-4 w-4" />
                                            Upload New File
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-1">
                                        { dxfFiles.map((dxfFile) => (
                                            <div
                                                key={dxfFile.id}
                                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer border border-gray-200 hover:border-blue-400"
                                                onClick={() => uploadFile(dxfFile)}
                                            >
                                                <div className="h-32 bg-blue-50 flex items-center justify-center">
                                                    <FileIcon className="h-16 w-16 text-blue-300" />
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="font-medium text-gray-800 truncate">{dxfFile.path}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">Size: 2.4 MB</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                selectedFile && savedComponent ? (
                                    <div className="relative w-full h-full" style={{ overflow: 'hidden' }}>
                                        <House file={selectedFile.path} components={savedComponent} height={height} />
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <Button
                                                className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg flex items-center gap-2"
                                                onClick={() => setFileListVisible(true)}
                                            >
                                                <FileIcon className="h-4 w-4" />
                                                Choose Another File
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                                        <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-700 mb-4">No file selected. Please select a file to continue.</p>
                                        <Button
                                            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                                            onClick={() => setFileListVisible(true)}
                                        >
                                            <FileIcon className="h-4 w-4" />
                                            Choose DXF File
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                            <div className="mb-6 bg-blue-50 p-10 rounded-lg inline-flex items-center justify-center">
                                <Upload className="h-20 w-20 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Your 3D Project</h3>
                            <p className="text-gray-600 mb-6">Drop a DXF file here or click to upload</p>
                            <Button
                                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 mx-auto"
                                onClick={handleUpload}
                            >
                                <Upload className="h-5 w-5" />
                                Upload DXF File
                            </Button>
                        </div>
                    )}
                </div>

                {modelLoaded && (
                    <div className="bg-white border-t border-gray-200 shadow-lg py-4 px-6">
                        <div className="flex justify-center items-center space-x-8">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                                        activeCategory === category.name
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <span className="text-lg font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedFile && (
                    <Button
                        className="absolute bottom-20 right-8 bg-blue-600 text-white hover:bg-blue-700 shadow-lg px-6 py-3 rounded-lg flex items-center gap-2"
                        onClick={handleSaveModel}
                    >
                        <Save className="h-5 w-5" />
                        {isExistingModel ? 'Update Model' : 'Save Model'}
                    </Button>
                )}
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