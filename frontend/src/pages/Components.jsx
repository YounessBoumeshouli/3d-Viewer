"use client"

import React, {useEffect, useState} from "react"
import Layout from "../components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx"
import { Plus } from "lucide-react"
import api from "../services/api.js";
import CategoryModel from "../components/admin/CategoryModel.jsx";
import ItemModel from "../components/admin/ItemModel.jsx";

function Components() {
    const [items,setItems] = useState([])
    const [category,setCategory] = useState({});
    const [categoryList,setCataegoryList] = useState([]);
    const  [categoryModel , setCategoryModel] = useState(false);
    const  [itemModel , setItemModel] = useState(false);
    console.log(category)
    const closeCategoryModel = () => {
        setCategoryModel(false)
    }
    const closeItemModel = () => {
        setItemModel(false)
    }
    useEffect(() => {
        const fetchCategoryList = async ()=>{
            try {
                const response = await api.get('categories');
                setCataegoryList(response.data);
            }catch (e) {
                console.error(e)
            }
        }

        fetchCategoryList()

    }, []);

    useEffect(() => {
        if (Object.keys(category).length === 0) return;

        const Items = async () => {
            console.log(category.id)
            try {
                const response = await api.get(`components/${category.id}`, {
                    responseType: "json"
                });
                setItems(response.data)

            } catch (error) {
                console.error(error)
            }
            console.log(items)
        }
        Items();
    }, [category]);

    const [showDialog, setShowDialog] = useState(false)
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6">
                {/* Add Component */}
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
                        <h2 className="text-2xl font-bold mb-2">Add Component</h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Create new project and customize it with your priority base UI kit element.
                        </p>
                        <Button className="bg-transparent hover:bg-[#3e435d]/20 border border-[#3e435d] rounded-full"
                                onClick={() => setCategoryModel(true)}>
                            <Plus className="h-5 w-5 mr-2" />
                            add New Category
                        </Button>
                    </CardContent>
                </Card>

                {/* Components Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {categoryList.map((component, i) => (
                        <Dialog
                            key={i}
                            open={showDialog}
                            onOpenChange={(isOpen) => {
                                setShowDialog(isOpen);
                                if (isOpen) setCategory(component);
                            }}                        >
                            <DialogTrigger asChild>
                                <Card
                                    className={`bg-gray-100 text-gray-800 cursor-pointer transition-all hover:shadow-md ${
                                       category && category.name === component.name ? "ring-2 ring-[#4353ff]" : ""
                                    }`}
                                    onClick={() => setCategory(component)}
                                >
                                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-4">
                                            {component.icon === "cube" && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                            {component.icon === "sofa" && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                            {component.icon === "building" && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4 21V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M2 21h20"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                            {component.icon === "table" && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M3 3h18v18H3z"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M3 9h18M3 15h18M9 3v18M15 3v18"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-gray-900">{component.name}</h3>
                                        <p className="text-sm text-gray-500">{component.dimensions}</p>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>

                            <DialogContent className="bg-white text-black">
                                <DialogHeader>
                                    <DialogTitle>{category.name}</DialogTitle>
                                    {Array.isArray(items) && items.length > 0 ? (
                                        <div className="flex flex-wrap gap-4">
                                            {items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="w-1/2 md:w-1/3 lg:w-1/4 p-4 border rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                                                >
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${item.path}`}
                                                        alt={item.name}
                                                        className="w-full h-32 object-cover rounded"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No {category.name}s found.</p>
                                    )}

                                </DialogHeader>
                                <div className="py-6">{/* Empty content for door dialog */}</div>
                                <Button
                                    className="w-full bg-[#6366f1] hover:bg-[#4f46e5]"
                                    onClick={() => {
                                        setItemModel(true);
                                        setShowDialog(false);
                                    }}>

                                add {category.name}</Button>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
            {categoryModel &&(
                <CategoryModel
                    onClose = {closeCategoryModel}
                />
            )}
            {itemModel && category &&(
                <ItemModel
                    onClose = {
                    ()=>{
                        closeItemModel();
                        setCategory({});
                    }
                }
                    category ={category}
                />
            )}
        </Layout>
    )
}

export default Components

