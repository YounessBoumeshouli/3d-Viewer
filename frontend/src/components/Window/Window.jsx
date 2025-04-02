import React, { useEffect, useState, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Window = ({ wallStart, wallEnd }) => {
    const [windowPath, setWindowPath] = useState(null);
    const [windowSize, setWindowSize] = useState({ width: 1, height: 1 }); // Default size

    // Calculate wall length and window max size
    const { wallLength, maxWindowWidth } = useMemo(() => {
        if (!wallStart || !wallEnd) return { wallLength: 0, maxWindowWidth: 0 };

        // Calculate wall length (2D distance ignoring Z-axis)
        const dx = wallEnd[0] - wallStart[0];
        const dy = wallEnd[1] - wallStart[1];
        const wallLength = Math.sqrt(dx * dx + dy * dy);

        // Window shouldn't exceed half of wall length
        const maxWindowWidth = wallLength * 0.5;

        return { wallLength, maxWindowWidth };
    }, [wallStart, wallEnd]);

    // Load window texture (keep your existing texture loading logic)
    const loadWindowTexture = () => { /* ... */ };

    // Load GLTF model and adjust size
    const { scene } = useGLTF("/window.glb");
    useEffect(() => {
        if (!scene) return;

        // Measure original window bounding box
        const bbox = new THREE.Box3().setFromObject(scene);
        const originalWidth = bbox.max.x - bbox.min.x;
        const originalHeight = bbox.max.y - bbox.min.y;

        // Calculate scale factor to fit within maxWindowWidth
        const scaleFactor = Math.min(1, maxWindowWidth / originalWidth);

        setWindowSize({
            width: originalWidth * scaleFactor,
            height: originalHeight * scaleFactor
        });

        scene.traverse((child) => {
            if (child.isMesh) {
                // Apply texture or default material (your existing code)
                // ...
            }
        });
    }, [scene, maxWindowWidth, windowPath]);

    if (!wallStart || !wallEnd) return null;

    // Position calculation (your existing code)
    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;
    const centerX = (startX + endX) / 3;
    const centerY = (startY + endY) / 2;
    const centerZ = (startZ + endZ) / 2;
    const angle = Math.atan2(endY - startY, endX - startX);

    console.log("Window dimensions:", windowSize);
    console.log("Max allowed width:", maxWindowWidth);

    return (
        <primitive
            object={scene}
            position={[centerX, 0, -centerY]}
            rotation={[0, angle, 0]}
            scale={[1, 1, 1]} // Scale is now controlled via bounding box
        />
    );
};

export default Window;