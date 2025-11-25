import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Room = ({ position, width = 5, length = 5 }) => {
    // Load textures for the floor
    const floorTextures = useTexture({
        map: '/textures/floor/wooden_floor_diffuse.jpg',
        normalMap: '/textures/floor/wooden_floor_normal.jpg',
        roughnessMap: '/textures/floor/wooden_floor_roughness.jpg',
        aoMap: '/textures/floor/wooden_floor_ambient_occlusion.jpg',
    });

    // Configure texture repeating
    useMemo(() => {
        Object.values(floorTextures).forEach(t => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(width / 2, length / 2);
        });
    }, [floorTextures, width, length]);

    return (
        <group position={[position.x, 0.02, position.y]}>
            {/* Render a floor plane for the room */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial {...floorTextures} />
            </mesh>

            {/* Optional: Add a label or 3D text hovering above */}
        </group>
    );
};

export default Room;