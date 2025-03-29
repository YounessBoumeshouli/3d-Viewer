"use client";
import React from "react";

function Header() {
    return (
        <header className="flex flex-wrap gap-5 justify-between w-full max-w-[1112px] max-md:max-w-full">
            <nav className="flex gap-6 my-auto">
                <div className="flex gap-2.5 text-blue-600">
                    <h1 className="grow text-2xl font-bold">3D Viewer</h1>
                    <span className="my-auto text-base text-center">Visualisation</span>
                </div>
                <ul className="flex gap-6 my-auto text-base text-center text-gray-600 whitespace-nowrap">
                    <li>
                        <a
                            href="#"
                            className="hover:text-blue-600 focus:outline-none focus:underline"
                        >
                            Bibliothèque
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-blue-600 focus:outline-none focus:underline"
                        >
                            Aide
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-4 items-center text-base text-center whitespace-nowrap">
                <div
                    className="flex shrink-0 self-stretch bg-white rounded-xl h-[52px] w-[52px]"
                    aria-hidden="true"
                />
                <button
                    className="self-stretch px-4 py-2.5 my-auto text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Annuler"
                >
                    Annuler
                </button>
                <button
                    className="self-stretch px-4 py-2.5 my-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Confirmer"
                >
                    Confirmer
                </button>
            </div>
        </header>
    );
}

export default Header;
