"use client";
import React from "react";

function LayersPanel() {
    return (
        <section
            className="flex flex-col items-start py-6 pr-14 pl-6 mt-6 w-full text-sm text-gray-600 bg-white rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5"
            aria-labelledby="layers-heading"
        >
            <h2 id="layers-heading" className="text-lg font-semibold text-black">
                Calques
            </h2>

            <div className="w-full mt-4">
                <div className="flex gap-3 items-center">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="layer-lines"
                            className="sr-only peer"
                            defaultChecked
                        />
                        <label
                            htmlFor="layer-lines"
                            className="flex shrink-0 my-auto bg-blue-500 rounded-sm border border-solid border-stone-500 h-[18px] w-[18px] cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-500"
                            aria-label="Toggle lines layer"
                        ></label>
                    </div>
                    <label htmlFor="layer-lines" className="cursor-pointer">
                        Lignes
                    </label>
                </div>
            </div>

            <div className="w-full mt-3">
                <div className="flex gap-3 items-center">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="layer-circles"
                            className="sr-only peer"
                            defaultChecked
                        />
                        <label
                            htmlFor="layer-circles"
                            className="flex shrink-0 my-auto bg-blue-500 rounded-sm border border-solid border-stone-500 h-[18px] w-[18px] cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-500"
                            aria-label="Toggle circles layer"
                        ></label>
                    </div>
                    <label htmlFor="layer-circles" className="cursor-pointer">
                        Cercles
                    </label>
                </div>
            </div>

            <div className="w-full mt-3">
                <div className="flex gap-3 items-center">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="layer-points"
                            className="sr-only peer"
                            defaultChecked
                        />
                        <label
                            htmlFor="layer-points"
                            className="flex shrink-0 my-auto bg-blue-500 rounded-sm border border-solid border-stone-500 h-[18px] w-[18px] cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-500"
                            aria-label="Toggle points layer"
                        ></label>
                    </div>
                    <label htmlFor="layer-points" className="cursor-pointer">
                        Points
                    </label>
                </div>
            </div>
        </section>
    );
}

export default LayersPanel;
