import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
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

    console.log("📍 Placing Door at:", { x: centerX, y: centerY, z: centerZ });
    console.log("🔄 Door Rotation Angle:", { radians: angle, degrees: (angle * 180) / Math.PI });

    // Load door model
    const { scene } = useGLTF('/door.glb');

    // Apply wood texture to door
    const doorTextures = useTexture({
        map: '/textures/door/wooden_door_diffuse.jpg',
        normalMap: '/textures/door/wooden_door_normal.jpg',
        roughnessMap: '/textures/door/wooden_door_roughness.jpg',
    });

    // Apply textures to all the door's meshes
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                ...doorTextures,
                color: 0xffffff,
                roughness: 0.7,
                metalness: 0.1
            });

            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return (
        <primitive
            object={scene}
            position={[centerX, 0, -centerY]}
            rotation={[0, angle, 0]}
            scale={[1, 1, 1]}
        />
    );
};

export default Door;