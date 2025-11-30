import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Room = ({ shapePoints, height = 1 }) => {
    // A. Load Textures
    const floorTextures = useTexture({
        map: '/textures/floor/wooden_floor_diffuse.jpg',
        normalMap: '/textures/floor/wooden_floor_normal.jpg',
        roughnessMap: '/textures/floor/wooden_floor_roughness.jpg',
        aoMap: '/textures/floor/wooden_floor_ambient_occlusion.jpg',
    });

    const wallTextures = useTexture({
        map: '/textures/stone/stone_diffuse.jpg',
        normalMap: '/textures/stone/stone_normal.jpg',
        roughnessMap: '/textures/stone/stone_roughness.jpg',
        aoMap: '/textures/stone/stone_ambient_occlusion.jpg',
    });

    // B. Configure Textures
    useMemo(() => {
        [floorTextures, wallTextures].forEach(textures => {
            Object.values(textures).forEach(t => {
                t.wrapS = t.wrapT = THREE.RepeatWrapping;
            });
        });
        // We'll set specific repeats in the render loop if needed,
        // but strictly speaking, simple repeat is fine for now.
        Object.values(wallTextures).forEach(t => t.repeat.set(2, 1));
    }, [floorTextures, wallTextures]);


    // C. Generate Geometry
    const { floorGeometry, wallSegments } = useMemo(() => {
        if (!shapePoints || shapePoints.length < 3) return { floorGeometry: null, wallSegments: [] };

        // 1. Create Floor Shape
        const shape = new THREE.Shape();
        shape.moveTo(shapePoints[0].x, shapePoints[0].y);
        shapePoints.slice(1).forEach(p => shape.lineTo(p.x, p.y));
        shape.closePath();

        const fGeo = new THREE.ShapeGeometry(shape);

        // Fix UV mapping for floor
        fGeo.computeBoundingBox();
        const box = fGeo.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        // Update texture repeat based on size
        Object.values(floorTextures).forEach(t => t.repeat.set(size.x / 2, size.y / 2));


        // 2. Calculate Wall Segments
        const segments = [];
        const wallHeight = height * 4; // Matching DXFModel scale (4 units per floor)
        const wallThickness = 0.2;

        for (let i = 0; i < shapePoints.length; i++) {
            const p1 = shapePoints[i];
            const p2 = shapePoints[(i + 1) % shapePoints.length]; // Wrap around to 0 for last segment

            // Calculate Wall Transform
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            const centerX = (p1.x + p2.x) / 2;
            const centerY = (p1.y + p2.y) / 2;

            segments.push({
                position: [centerX, centerY, wallHeight / 2], // Z is up in this group
                rotation: [0, 0, angle], // Rotate around Z to align with floor plan
                args: [len, wallThickness, wallHeight] // Length, Thickness, Height
            });
        }

        return { floorGeometry: fGeo, wallSegments: segments };
    }, [shapePoints, height, floorTextures]);

    if (!floorGeometry) return null;

    return (
        <group>
            {/* 1. FLOOR */}
            <mesh
                geometry={floorGeometry}
                position={[0, 0, 0.02]}
                receiveShadow
            >
                <meshStandardMaterial {...floorTextures} side={THREE.DoubleSide} />
            </mesh>

            {/* 2. WALLS */}
            {wallSegments.map((seg, i) => (
                <mesh
                    key={i}
                    position={seg.position}
                    rotation={seg.rotation}
                    castShadow
                    receiveShadow
                >
                    {/* BoxGeometry: width (len), depth (thickness), height */}
                    <boxGeometry args={seg.args} />
                    <meshStandardMaterial {...wallTextures} />
                </mesh>
            ))}
        </group>
    );
};

export default Room;