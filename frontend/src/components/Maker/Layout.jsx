"use client"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Bell } from "lucide-react"
import { Button } from "./ui/button"

function Layout() {
    const location = useLocation()
    const pathname = location.pathname
    // const [sidebarOpen, setSidebarOpen] = useState(true) // Removed useState and sidebar logic

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            3D Viewer
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link to="/" className="text-gray-600 hover:text-blue-600">
                                Visualisation
                            </Link>
                            <Link to="/library" className="text-gray-600 hover:text-blue-600">
                                Bibliothèque
                            </Link>
                            <Link to="/help" className="text-gray-600 hover:text-blue-600">
                                Aide
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-gray-500" />
                        <Button variant="outline" className="text-gray-600 border-gray-300">
                            Annuler
                        </Button>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700">Confirmer</Button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

