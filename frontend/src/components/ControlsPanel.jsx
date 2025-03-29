"use client";
import React, { useState } from "react";

function ControlsPanel() {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => {
        setZoomLevel(prev => prev + 10);
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(10, prev - 10));
    };

    const handleRotateClockwise = () => {
        setRotation(prev => (prev + 15) % 360);
    };

    const handleRotateCounterClockwise = () => {
        setRotation(prev => (prev - 15 + 360) % 360);
    };

    return (
        <section
            className="flex flex-col items-start py-6 pr-14 pl-6 w-full text-base text-black bg-white rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5"
            aria-labelledby="controls-heading"
        >
            <h2 id="controls-heading" className="text-lg font-semibold">Contrôles</h2>

            <div className="flex gap-3 mt-4 items-center w-full">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/c6e33a1a78594d089d34cd6da1172fea/48a545e7b0866f8c0518f1a84a4c169b3c2d3ace?placeholderIfAbsent=true"
                    className="object-contain shrink-0 my-auto w-4 aspect-square"
                    alt="Zoom icon"
                />
                <div className="flex gap-1">
                    <span>Zoom:</span>
                    <span>{zoomLevel}</span>
                </div>
                <div className="flex gap-2 text-center ml-auto">
                    <button
                        className="px-2 w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        onClick={handleZoomOut}
                        aria-label="Zoom out"
                    >
                        -
                    </button>
                    <button
                        className="px-1.5 w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        onClick={handleZoomIn}
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex gap-3 mt-4 items-center w-full">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/c6e33a1a78594d089d34cd6da1172fea/228d9ee82188af29fc662a8670dddda4296f249e?placeholderIfAbsent=true"
                    className="object-contain shrink-0 my-auto w-4 aspect-square"
                    alt="Rotation icon"
                />
                <div className="flex">
                    <span>Rotation:</span>
                    <span>{rotation}</span>
                    <span>°</span>
                </div>
                <div className="flex gap-2 text-center ml-auto">
                    <button
                        className="px-1 w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        onClick={handleRotateCounterClockwise}
                        aria-label="Rotate counterclockwise"
                    >
                        ⟲
                    </button>
                    <button
                        className="px-1 w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        onClick={handleRotateClockwise}
                        aria-label="Rotate clockwise"
                    >
                        ⟳
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ControlsPanel;
