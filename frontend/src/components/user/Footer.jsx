import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const path = location.pathname;

    const isHomePage = path === '/';
    const isModelPage = path.includes('/models');
    const isDesignerPage = path.includes('/designer');
    const isViewerPage = path.includes('/viewer');

    if (isHomePage) {
        return (
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">DesignLab</h3>
                            <p className="text-sm text-gray-400">
                                Creating innovative design solutions for tomorrow's challenges.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
                                <li><Link to="/models" className="hover:text-white">Models</Link></li>
                                <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
                            </ul>
                        </div>
                        <div></div>
                        <div>
                            <h4 className="font-medium mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Email: contact@designlab.com</li>
                                <li>Phone: (555) 123-4567</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
                        © 2025 3D house App. All rights reserved.
                    </div>
                </div>
            </footer>
        );
    }

    if (isModelPage || isViewerPage) {
        return (
            <footer className="bg-white py-8 border-t">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-medium mb-4">About</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/press">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/help">Help Center</Link></li>
                                <li><Link to="/safety">Safety Center</Link></li>
                                <li><Link to="/community">Community</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/cookies">Cookie Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 text-sm text-gray-600 text-center">
                        © 2025 3D house App. All rights reserved.
                    </div>
                </div>
            </footer>
        );
    }

    if (isDesignerPage) {
        return (
            <footer className="bg-gray-900 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold mb-2">Design Folio</h3>
                            <p className="text-sm text-gray-400">
                                Creating meaningful digital experiences through thoughtful design solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Quick Links</h4>
                            <ul className="space-y-1 text-sm text-gray-400">
                                <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
                                <li><Link to="/models" className="hover:text-white">Models</Link></li>
                                <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Connect</h4>
                            <div className="flex space-x-4 text-gray-400">
                                <a href="#" className="hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9l5 3-5 3V9z"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 pt-4 text-sm text-gray-500 text-center">
                        © 2025 3D house App. All rights reserved.
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-gray-100 py-4 mt-10">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
                © 2025 3D house App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;