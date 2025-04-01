"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Calendar, ChevronDown, Cog, Grid, LayoutDashboard, LogOut, Users } from "lucide-react"

function Layout({ children }) {
    const location = useLocation()
    const pathname = location.pathname
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-[#1f2124] text-white overflow-hidden">
            {/* Left sidebar */}
            <div className="w-[80px] bg-[#242634] flex flex-col items-center border-r border-[#3e435d]/20">
                <div className="p-4 mb-6">
                    <div className="w-12 h-12 bg-[#0e5ca7] rounded-lg flex items-center justify-center font-bold text-lg">
                        DBM.
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <Link
                        to="/dashboard"
                        className={`p-3 rounded-lg ${pathname === "/dashboard" ? "bg-[#3e435d]/30 text-[#4353ff]" : "text-gray-400"}`}
                    >
                        <Grid className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/analytics"
                        className={`p-3 rounded-lg ${pathname === "/analytics" ? "bg-[#3e435d]/30 text-[#4353ff]" : "text-gray-400"}`}
                    >
                        <LayoutDashboard className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/team"
                        className={`p-3 rounded-lg ${pathname === "/team" ? "bg-[#3e435d]/30 text-[#4353ff]" : "text-gray-400"}`}
                    >
                        <Users className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/calendar"
                        className={`p-3 rounded-lg ${pathname === "/calendar" ? "bg-[#3e435d]/30 text-[#4353ff]" : "text-gray-400"}`}
                    >
                        <Calendar className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/components"
                        className={`p-3 rounded-lg ${pathname === "/components" ? "bg-[#3e435d]/30 text-[#4353ff]" : "text-gray-400"}`}
                    >
                        <Cog className="h-6 w-6" />
                    </Link>
                </div>

                <div className="mt-auto mb-6">
                    <Link to="/logout" className="p-3 rounded-lg text-[#4353ff]">
                        <LogOut className="h-6 w-6" />
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-[#3e435d]/20 flex items-center px-6 gap-4">
                    <div className="flex gap-4">
                        <Link
                            to="/dashboard"
                            className={`px-6 py-3 rounded-lg ${pathname === "/dashboard" ? "bg-transparent text-[#4353ff]" : "bg-[#242634] text-gray-300"}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/message"
                            className={`px-6 py-3 rounded-lg ${pathname === "/message" ? "bg-transparent text-[#4353ff]" : "bg-[#242634] text-gray-300"}`}
                        >
                            Message
                        </Link>
                        <Link
                            to="/help"
                            className={`px-6 py-3 rounded-lg ${pathname === "/help" ? "bg-transparent text-[#4353ff]" : "bg-[#242634] text-gray-300"}`}
                        >
                            Help
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Bell className="h-5 w-5" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/avatar.jpg" alt="User" />
                                        <AvatarFallback className="bg-[#4353ff]">JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#242634] border-[#3e435d]/20 text-white">
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-[#242634] border-[#3e435d]/20 text-white flex items-center gap-2"
                                >
                                    Admin
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#242634] border-[#3e435d]/20 text-white">
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Users</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-[#3e435d]/20 cursor-pointer">
                                    <span>Permissions</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    )
}

export default Layout

