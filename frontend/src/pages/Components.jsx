"use client"

import { useState } from "react"
import Layout from "../components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx"
import { Plus } from "lucide-react"

function Components() {
    const [selectedComponent, setSelectedComponent] = useState(null)
    const [showDoorDialog, setShowDoorDialog] = useState(false)

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
                        <Button className="bg-transparent hover:bg-[#3e435d]/20 border border-[#3e435d] rounded-full">
                            <Plus className="h-5 w-5 mr-2" />
                            Create New Component
                        </Button>
                    </CardContent>
                </Card>

                {/* Components Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {[
                        { name: "Maison Moderne", dimensions: "200×150×180 cm", icon: "cube" },
                        { name: "Canapé Design", dimensions: "180×80×90 cm", icon: "sofa" },
                        { name: "Structure Industrielle", dimensions: "500×300×400 cm", icon: "building" },
                        { name: "Table Classique", dimensions: "120×75×80 cm", icon: "table" },
                    ].map((component, i) => (
                        <Dialog
                            key={i}
                            open={component.name === "Maison Moderne" && showDoorDialog}
                            onOpenChange={setShowDoorDialog}
                        >
                            <DialogTrigger asChild>
                                <Card
                                    className={`bg-gray-100 text-gray-800 cursor-pointer transition-all hover:shadow-md ${
                                        selectedComponent === component.name ? "ring-2 ring-[#4353ff]" : ""
                                    }`}
                                    onClick={() => setSelectedComponent(component.name)}
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
                                    <DialogTitle>Doors</DialogTitle>
                                </DialogHeader>
                                <div className="py-6">{/* Empty content for door dialog */}</div>
                                <Button className="w-full bg-[#6366f1] hover:bg-[#4f46e5]">add Door</Button>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Components

