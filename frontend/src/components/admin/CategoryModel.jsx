"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useEffect,useState} from "react";


function handleSelect(item,title) {

    console.log("selected item :",item);
    console.log('selected type : ',title)
    localStorage.setItem(title,item.path);
    const storedDoor = localStorage.getItem("door");
    console.log(title,storedDoor)

}

function CategoryModel({ title = 'hello', onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Side (Image or Illustration) */}
                        <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-lg">
                            <img src="/login-illustration.svg" alt="Login" className="w-3/4 h-auto" />
                        </div>

                        {/* Right Side (Login Form) */}
                        <div className="flex flex-col justify-center">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm text-blue-600 hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Sign In
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

