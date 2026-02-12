"use client"
import { fetchAndParseWalls } from '../services/dxfHelpers.js';
import {useEffect, useRef, useState} from "react"
import {
    ChevronLeft,
    ChevronRight,
    FileIcon,
    Home,
    Layers,
    Minus,
    Move,
    Plus,
    RotateCcw,
    RotateCw,
    Save,
    Search,
    Settings,
    Upload
} from "lucide-react"
import {Button} from "@/components/ui/button"
import ComponentModal from "../components/Maker/ComponentModel.jsx"
import House from "../pages/house.jsx"
import api from "../services/api.js"
import FileUploadModal from "../components/Maker/FileUploadModal.jsx"
import Loader from '../components/Maker/Loader.jsx'
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import TwoDViewer from "../components/Maker/TwoDViewer.jsx"; 
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
    const [alert, setAlert] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [screenshotDescription, setScreenshotDescription] = useState("")
    const [canvasReady, setCanvasReady] = useState(false)
    const [isRendererReady, setIsRendererReady] = useState(false)
    const [viewMode, setViewMode] = useState('2d'); 
    const [extractedWalls, setExtractedWalls] = useState([]); 
    const componentRef = useRef();
    const sceneRef = useRef(null);
    const houseRef = useRef();
        const [userDesign, setUserDesign] = useState({}); 

    const handleStageSelect = (stage) => {
        setHeight(stage);
        setViewMode('2d');
    };

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

    useEffect(() => {
        if (alert != null){
            setTimeout(() => setAlert(null), 10000)
        }
    }, [alert]);


    const handleSelectedModel = (id) => {
        setSelectedModel(id)
    }

    const fetchCreatorInfo = async () => {
        const response = await api.get('MyProfile');
        setPlanInfos(response.data.useroffer.offer);
        setUserInfos(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        if (selectedFile && sceneRef.current) {
            const updateScene = () => {
                if (sceneRef.current.updateScene) {
                    sceneRef.current.updateScene();
                }
            };
            updateScene();
        }
    }, [selectedFile, height, savedComponent]);

    const handleCanvasReady = () => {
        setCanvasReady(true);
        setModelLoaded(true);
        setIsRendererReady(true);
    };
    const getCanvas = () => {
        if (!componentRef.current) return null;

        return componentRef.current.querySelector('.threejs-canvas') ||
            componentRef.current.querySelector('canvas');
    };

    const takeScreenshot = async () => {
        try {
            const renderer = houseRef.current?.getRenderer();
            const scene = houseRef.current?.getScene();
            const camera = houseRef.current?.getCamera();

            if (!renderer || !scene || !camera) {
                console.error("Renderer, scene, or camera not available");
                return null;
            }

            renderer.render(scene, camera);

            const canvas = renderer.domElement;
            if (!canvas || typeof canvas.toDataURL !== 'function') {
                console.error("Invalid canvas element");
                return null;
            }

            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error("Screenshot error:", error);
            return null;
        }
    };
    useEffect(() => {
        if (houseRef.current) {
            houseRef.current.getCanvas = getCanvas;
        }
    }, [houseRef.current, canvasReady]);

    const handleSaveModel = async () => {
        if (!houseRef.current || !isRendererReady) {
            setAlert("Please wait while the model loads completely");
            return;
        }
        const designPayload = userDesign;

        setIsLoading(true);
        let imgData = null;

        try {
            
            let retries = 0;
            while (retries < 3 && !imgData) {
                imgData = await takeScreenshot();
                if (!imgData) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                    retries++;
                }
            }

            if (!imgData) {
                setAlert("Proceeding without preview image");
            }

            const components = categories
                .filter(category => localStorage.getItem(category.name) != null)
                .map((category) => ({
                    path: localStorage.getItem(category.name)
                }));
            if (isExistingModel) {
                setScreenshotDescription("Updating existing model...");
                const response = await api.put(`houses/${selectedModel}`, {
                    "components": components,
                    "stage": height,
                    "thumbnail": imgData,
                    "design_data": designPayload 
                });
                await fetchCreatorModels();
                await fetchCreatorInfo();
                setAlert(response.data.status.message);
            } else {
                setScreenshotDescription("Saving new model...");
                const dataToSend = components.length > 0 ? components : null;

                const response = await api.post('houses', {
                    "dxf_file_id": selectedFile.id,
                    "components": dataToSend,
                    "stage": height,
                    "thumbnail": imgData,
                    "design_data": designPayload
                });

                if (response) {
                    setAlert(response.data.status);
                    handleSelectedModel(response.data.house_id);
                } else {
                    setAlert("Error: No response received from server");
                }

                await fetchCreatorModels();
                await fetchCreatorInfo();
            }
        } catch (e) {
            setAlert("Error saving model: ");
        } finally {
            setIsLoading(false);
        }
    };

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
        if (models.length >= planInfos.models) {
            setAlert("You have reached your model limit. Please upgrade your plan or delete existing models.");
        } else {
            try {
                const response = await api.get('myfiles')
                setDxfFiles(response.data)
                console.log(response.data)
                setFileListVisible(true)
                setModelLoaded(true)
            } catch (error) {
                console.error("Error fetching DXF file:", error)
                setAlert("Error fetching your files: " + (error.response?.data?.message || error.message));
            }
        }
    }

    const uploadFile = async (selectedFilePath) => {
        try {
            
            setSelectedFile(selectedFilePath);
            setFileListVisible(false);

            
            setViewMode('2d');

            
            const walls = await fetchAndParseWalls(selectedFilePath.path);
            setExtractedWalls(walls);

        } catch (error) {
            console.error("Error loading file:", error);
            setAlert("Error loading file: " + error.message);
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
                    if (response.data.design_data) {
                        
                        if (Array.isArray(response.data.design_data.windows)) {
                            
                            setUserDesign({ [response.data.stage]: response.data.design_data });
                        } else {
                            
                            setUserDesign(response.data.design_data);
                        }
                    }
                    uploadFile(response.data.dxf_file)
                    console.log(response.data)
                } catch (e) {
                    console.error(e)
                    setAlert("Error loading model: " + (e.response?.data?.message || e.message));
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
                setAlert("Error loading categories: " + (error.response?.data?.message || error.message));
            }
        }
        fetchCategories()
    }, [])

    if (isLoading) {
        return (
            <LoadingIndicator message="Please wait" description={screenshotDescription} />
        )
    }
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
                                selectedFile ? (
                                    <div className="relative w-full h-full" ref={componentRef} style={{
                                        overflow: 'hidden',
                                        '--background': '240, 10%, 96%',
                                        '--foreground': '0, 0%, 0%',
                                        backgroundColor: 'hsl(var(--background))',
                                        color: 'hsl(var(--foreground))',
                                    }}>
                                        {}
                                        {viewMode === '2d' ? (
                                            <div className="w-full h-full bg-white relative">
                                                <TwoDViewer
                                                    walls={extractedWalls}
                                                    savedDesign={userDesign[height] || { doors: [], rooms: [], windows: [] }} 
                                                    onUpdateDesign={(doors, rooms, windows) =>
                                                        setUserDesign(prev => ({ ...prev, [height]: { doors, rooms, windows } }))
                                                    }
                                                />

                                                {}
                                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                                                    <Button
                                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg shadow-xl rounded-full transition-all hover:scale-105"
                                                        onClick={() => setViewMode('3d')}
                                                    >
                                                        Build 3D House
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <House
                                                    file={selectedFile.path}
                                                    components={savedComponent}
                                                    height={height}
                                                    ref={houseRef}
                                                    onCanvasReady={handleCanvasReady}
                                                    userDesign={userDesign}
                                                    preParsedWalls={extractedWalls}
                                                    onStageSelect={handleStageSelect}
                                                />

                                                <div className="absolute top-4 left-4 z-10">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setViewMode('2d')}
                                                        className="bg-white/90 backdrop-blur"
                                                    >
                                                        Back to 2D Editor
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                        {}

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
                                ): (
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
            {
                alert &&
                <div className="fixed inset-80 z-50 flex flex-col gap-2 w-100 sm:w-72 text-[10px] sm:text-xs z-50">
                    <div
                        className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
                    >
                        <div className="flex gap-2">
                            <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white">Warning</p>
                                <p className="text-gray-500">{alert}</p>
                            </div>
                        </div>
                        <button
                            className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
                            onClick={() => setAlert(null)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Viewer3D