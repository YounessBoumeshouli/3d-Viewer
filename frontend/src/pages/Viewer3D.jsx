"use client";
import React from "react";
import Header from "../components/Header" ;
import ControlsPanel from "../components//ControlsPanel";
import LayersPanel from "../components/LayersPanel";
import ViewerCanvas from "../components/ViewerCanvas";
import ObjectToolbar from "../components/ObjectToolbar";
import House from "./house.jsx";

function Viewer3D() {
    return (
        <div className="overflow-hidden bg-white">
            <div className="flex flex-col items-center pt-2.5 pb-8 w-full bg-gray-50 max-md:max-w-full">
                <Header />
                <div className="flex shrink-0 self-stretch mt-3 h-px bg-gray-200 max-md:max-w-full" />
                <main
                    className="mt-8 w-full max-w-[1208px] max-md:max-w-full"
                    aria-label="3D Viewer Content"
                >
                    <div className="flex gap-5 max-md:flex-col">
                        <aside className="w-[24%] max-md:ml-0 max-md:w-full">
                            <div className="whitespace-nowrap max-md:mt-8">
                                <ControlsPanel />
                                <LayersPanel />
                            </div>
                        </aside>
                        <section className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                            <House />
                        </section>
                    </div>
                </main>
                <ObjectToolbar />
            </div>
        </div>
    );
}

export default Viewer3D;
