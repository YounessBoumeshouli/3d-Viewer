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
        // FIX: Position uses (x, y, z). Z is height.
        // Since we are inside the rotated group, Z is 'up' relative to the floorplan.
        <group position={[position.x, position.y, 0.05]}>

            {/* FIX: Remove rotation={[-Math.PI/2, 0, 0]} because the parent group is already rotated */}
            <mesh receiveShadow>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial {...floorTextures} side={THREE.DoubleSide} />
            </mesh>

            {/* Optional: Label */}
            <mesh position={[0, 0, 2]}>
                {/* Floating text marker if needed */}
            </mesh>
        </group>
    );
};

export default Room;