import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AxesHelper, GridHelper } from 'three';
import Sky from "../models/Sky.jsx";
import { Loader, OrbitControls } from "@react-three/drei";
import DXFModel from '../models/DFXModel.jsx';
import Door from '../components/Door/Door.jsx';

function House() {
    const adjustIslandForScreenSize = () => {
        let screenScale = window.innerWidth <= 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];
        return [screenScale, [0, 0, 0]];
    };

    const [islandScale, islandPosition] = adjustIslandForScreenSize();
    const [longestWall, setLongestWall] = useState(null);

    useEffect(() => {
        if (longestWall) {
            console.log("🟦 Longest Wall Detected!");
            console.log("📍 Start:", longestWall.start);
            console.log("📍 End:", longestWall.end);
            console.log("📏 Length:", longestWall.length);
        }
    }, [longestWall]);
    return (
        <Canvas className="w-full h-screen bg-transparent" camera={{ position: [10, 10, 10], fov: 75, near: 0.1, far: 1000 }} shadows>
            <primitive object={new AxesHelper(100)} />
            <primitive object={new GridHelper(100, 100)} />

            <Suspense fallback={<Loader />}>
                <directionalLight position={[1, 1, 1]} intensity={2} />
                <OrbitControls enableZoom enablePan enableRotate />
                <ambientLight intensity={0.5} />

                <group rotation={[-Math.PI / 2, 0, 0]}> {/* Rotating DXF walls */}
                    <DXFModel scale={islandScale} position={islandPosition} setLongestWall={setLongestWall} />
                </group>

                {longestWall && (
                    <Door
                        wallStart={[longestWall.start.x, longestWall.start.y, 0.5]} // Ensure it's above ground
                        wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                    />
                )}
            </Suspense>
        </Canvas>
    );
}

export default House;
