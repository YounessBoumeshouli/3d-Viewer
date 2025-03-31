import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Door = ({ wallStart, wallEnd }) => {
    if (!wallStart || !wallEnd) return null; // Ensure valid data

    // Extract coordinates from wallStart and wallEnd
    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;

    // Calculate the center of the wall
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const centerZ = (startZ + endZ) / 2;

    // Calculate the angle of the wall in radians
    const angle = Math.atan2(endY - startY, endX - startX);

    // Use the wall angle directly without adding 90 degrees
    // This will align the door with the wall instead of perpendicular to it
    const doorAngle = angle;

    console.log("📍 Placing Door at:", { x: centerX, y: centerY, z: centerZ });
    console.log("🔄 Door Rotation Angle:", { radians: doorAngle, degrees: (doorAngle * 180) / Math.PI });

    // Load door model
    const { scene } = useGLTF('/door.glb');

    return (
        <primitive
            object={scene}
            position={[centerX, 0, -centerY]}
            rotation={[0, doorAngle, 0]} // Apply rotation without the 90-degree addition
            scale={[1, 1, 1]}
        />
    );
};

export default Door;