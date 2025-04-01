"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

function ComponentModal({ title, icon, items, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            <span className="mr-2">{icon}</span>
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-100 h-48 flex items-center justify-center">
                                    <img src="/placeholder.svg?height=300&width=200" alt={item.name} className="max-h-full max-w-full" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{item.dimensions}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-blue-600 font-semibold">{item.price}</span>
                                        <div className="space-x-2">
                                            <Button variant="outline" className="text-gray-700 border-gray-300">
                                                Aperçu
                                            </Button>
                                            <Button className="bg-blue-600 text-white hover:bg-blue-700">Sélectionner</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentModal

