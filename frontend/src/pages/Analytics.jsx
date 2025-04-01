"use client"

import { useState } from "react"
import Layout from "../components/admin/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Analytics() {
    const [activeTab, setActiveTab] = useState("monthly")

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Stats Chart */}
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader className="flex flex-col space-y-1.5">
                        <CardTitle className="text-sm font-medium text-gray-400">Monthly Stats</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">85901</span>
                            <div className="bg-green-500/20 p-1 rounded">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 19V5M12 5L5 12M12 5L19 12"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex items-center justify-end px-6 mb-4">
                            <div className="bg-[#1f2124] rounded-full p-1">
                                <button
                                    className={`px-4 py-1 rounded-full text-sm ${activeTab === "monthly" ? "text-white" : "text-gray-400"}`}
                                    onClick={() => setActiveTab("monthly")}
                                >
                                    Monthly
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-full text-sm ${activeTab === "weekly" ? "bg-[#4353ff] text-white" : "text-gray-400"}`}
                                    onClick={() => setActiveTab("weekly")}
                                >
                                    Weekly
                                </button>
                            </div>
                        </div>
                        <div className="h-[300px] w-full flex items-end justify-between px-6 pb-6 gap-1">
                            {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((day, i) => {
                                // Determine if the bar should be blue (days 11-17)
                                const isBlue = day >= 11 && day <= 17
                                const height = [40, 65, 80, 90, 70, 85, 60, 50, 40, 70, 90, 60, 75, 65, 80, 70][i]

                                return (
                                    <div key={i} className="flex flex-col items-center">
                                        <div
                                            className={`w-5 rounded-t-md ${isBlue ? "bg-[#4353ff]" : "bg-gray-300"}`}
                                            style={{ height: `${height * 2}px` }}
                                        />
                                        <div className="text-xs text-gray-400 mt-2">{day}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Feature Effort Estimation */}
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-400">Feature Effort Estimation</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-8">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                {/* Background circle */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#a5c9e6" strokeWidth="10" />

                                {/* Progress circle - 75% complete */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#4353ff"
                                    strokeWidth="10"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="62.8"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#4353ff]"></div>
                                <span className="text-sm">Research & Planning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#4353ff]"></div>
                                <span className="text-sm">Development</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#a5c9e6]"></div>
                                <span className="text-sm">Design</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#a5c9e6]"></div>
                                <span className="text-sm">Testing</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Project Views */}
            <Card className="bg-[#242634] border-[#3e435d]/20 text-white mb-6">
                <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-sm font-medium text-gray-400">Monthly Project Views</CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">17221</span>
                        <div className="bg-green-500/20 p-1 rounded">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 19V5M12 5L5 12M12 5L19 12"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full relative">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4, 5].map((line, i) => (
                            <div key={i} className="absolute w-full border-t border-[#3e435d]/20" style={{ top: `${i * 20}%` }}>
                                <span className="absolute -left-12 -top-3 text-gray-400 text-sm">{(5 - i) * 100}</span>
                            </div>
                        ))}

                        {/* Line chart */}
                        <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
                            {/* Line */}
                            <path
                                d="M50,250 L150,200 L250,150 L350,140 L450,160 L550,150 L650,120 L750,80 L850,50 L950,30"
                                fill="none"
                                stroke="#4353ff"
                                strokeWidth="3"
                            />

                            {/* Data points */}
                            <circle cx="50" cy="250" r="6" fill="#4353ff" />
                            <circle cx="150" cy="200" r="6" fill="#4353ff" />
                            <circle cx="250" cy="150" r="6" fill="#4353ff" />
                            <circle cx="350" cy="140" r="6" fill="#4353ff" />
                            <circle cx="450" cy="160" r="6" fill="#4353ff" />
                            <circle cx="550" cy="150" r="6" fill="#4353ff" />
                            <circle cx="650" cy="120" r="6" fill="#4353ff" />
                            <circle cx="750" cy="80" r="6" fill="#4353ff" />
                            <circle cx="850" cy="50" r="6" fill="#4353ff" />
                            <circle cx="950" cy="30" r="6" fill="#4353ff" />
                        </svg>

                        {/* X-axis labels */}
                        <div className="flex justify-between mt-4 px-4">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month, i) => (
                                <div key={i} className="text-gray-400 text-sm">
                                    {month}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Analytics

