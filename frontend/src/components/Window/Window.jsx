import React, { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Window = ({ wallStart, wallEnd, position = "center" }) => {
    const instanceId = useRef(`window-${position}-${Math.random().toString(36).substring(2, 9)}`);
    console.log(`Window ${instanceId.current} initializing with position: ${position}`);

    // Use state to track loading status
    const [modelError, setModelError] = useState(null);

    // Properly handle model loading with error boundary
    let windowModel;
    try {
        // Use the useGLTF hook with error handling
        windowModel = useGLTF("/window__wodden_4_mb.glb");
    } catch (error) {
        console.error("Error in useGLTF:", error);
        setModelError(error.message);
    }

    // Position and scale calculations (same as before)
    const [scale, setScale] = useState(0.3);
    const [windowPosition, setWindowPosition] = useState([0, 0, 0]);

    useEffect(() => {
        if (!wallStart || !wallEnd) return;

        // Calculate wall length (2D distance)
        const wallLength = Math.sqrt(
            Math.pow(wallEnd[0] - wallStart[0], 2) +
            Math.pow(wallEnd[1] - wallStart[1], 2)
        );

        // Direction vector calculations...
        const dirX = wallEnd[0] - wallStart[0];
        const dirY = wallEnd[1] - wallStart[1];

        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        const normDirX = dirX / length;
        const normDirY = dirY / length;

        const centerX = (wallStart[0] + wallEnd[0]) / 2;
        const centerY = (wallStart[1] + wallEnd[1]) / 2;

        let offsetX = 0;
        let offsetY = 0;
        const offsetDistance = wallLength * 0.25;

        if (position === "left") {
            offsetX = -normDirX * offsetDistance;
            offsetY = -normDirY * offsetDistance;
        } else if (position === "right") {
            offsetX = normDirX * offsetDistance;
            offsetY = normDirY * offsetDistance;
        }

        setWindowPosition([
            centerX + offsetX,
            2,
            -(centerY + offsetY)
        ]);

        if (wallLength > 0) {
            const maxWindowWidth = 1.5;
            const calculatedScale = maxWindowWidth / wallLength + 1;
            const minScale = 0.5;
            setScale(Math.max(minScale, calculatedScale));
        }

        console.log(`Window ${instanceId.current} calculated position:`, [centerX + offsetX, 2, -(centerY + offsetY)]);
    }, [wallStart, wallEnd, position]);

    if (!wallStart || !wallEnd) return null;
    if (modelError) {
        console.warn(`Window ${instanceId.current} failed to load model:`, modelError);
        return null; // Return null or a fallback component when model fails to load
    }

    const angle = Math.atan2(wallEnd[1] - wallStart[1], wallEnd[0] - wallStart[0]);

    return (
        <>
            {windowModel && (
                <primitive
                    object={windowModel.scene.clone()}
                    position={windowPosition}
                    rotation={[0, angle, 0]}
                    scale={[scale, scale, scale]}
                />
            )}
        </>
    );
};

// Preload the model to avoid suspense issues
useGLTF.preload("/window__wodden_4_mb.glb");

export default Window;