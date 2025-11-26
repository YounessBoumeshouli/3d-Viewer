import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Room = ({ shapePoints }) => {
    // 1. Load Textures
    const floorTextures = useTexture({
        map: '/textures/floor/wooden_floor_diffuse.jpg',
        normalMap: '/textures/floor/wooden_floor_normal.jpg',
        roughnessMap: '/textures/floor/wooden_floor_roughness.jpg',
        aoMap: '/textures/floor/wooden_floor_ambient_occlusion.jpg',
    });

    // 2. Create Geometry from Points
    const geometry = useMemo(() => {
        // Need at least 3 points to make a shape
        if (!shapePoints || shapePoints.length < 3) return null;

        const shape = new THREE.Shape();

        // Move to first point
        shape.moveTo(shapePoints[0].x, shapePoints[0].y);

        // Connect the rest
        shapePoints.slice(1).forEach(p => {
            shape.lineTo(p.x, p.y);
        });

        // Close shape
        shape.closePath();

        // Create geometry (flat plane)
        return new THREE.ShapeGeometry(shape);
    }, [shapePoints]);

    // 3. Configure Texture Repeating
    useMemo(() => {
        if (!geometry) return;

        // Calculate bounding box to determine texture repeat scale
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const width = box.max.x - box.min.x;
        const height = box.max.y - box.min.y;

        Object.values(floorTextures).forEach(t => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(width / 2, height / 2); // Adjust scaling factor as needed
        });
    }, [floorTextures, geometry]);

    if (!geometry) return null;

    return (
        // Render slightly above Z=0 to avoid z-fighting
        <mesh
            geometry={geometry}
            position={[0, 0, 0.02]}
            rotation={[0, 0, 0]}
            receiveShadow
        >
            <meshStandardMaterial {...floorTextures} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default Room;