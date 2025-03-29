"use client";
import React from "react";
import ObjectToolbar from "./ObjectToolbar";

function ViewerCanvas() {
    return (
        <article
            className="grow pt-6 w-full bg-white rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:mt-8 max-md:max-w-full"
            aria-label="3D Visualization Canvas"
        >
            <div className="px-14 mx-6 bg-gray-50 rounded-lg max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/c6e33a1a78594d089d34cd6da1172fea/e36581cd700a04566e85fcbd86b5c3b9280f508c?placeholderIfAbsent=true"
                    className="object-contain w-full aspect-[1.33] max-md:max-w-full"
                    alt="3D visualization of the model"
                />
            </div>
            <div className="flex shrink-0 mt-6 h-px bg-gray-200 max-md:max-w-full" />
            <ObjectToolbar />
        </article>
    );
}

export default ViewerCanvas;
