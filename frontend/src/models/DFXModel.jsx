import React, { Suspense, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { DxfParser } from 'dxf-parser';
import { useTexture } from '@react-three/drei';
import Loader from '../components/Loader';

const DXFModel = ({ scale = [1, 1, 1], position = [0, 0, 0], setLongestWall }) => {
    const [entities, setEntities] = useState([]);

    // Load textures for different wall materials
    const stoneTextures = useTexture({
        map: '/textures/stone/stone_diffuse.jpg',
        normalMap: '/textures/stone/stone_normal.jpg',
        roughnessMap: '/textures/stone/stone_roughness.jpg',
        aoMap: '/textures/stone/stone_ambient_occlusion.jpg',
    });

    // Apply texture repetition
    Object.values(stoneTextures).forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1); // Adjust based on your wall size
    });

    // Create materials with textures
    const WALL_MATERIAL = new THREE.MeshStandardMaterial({
        ...stoneTextures,
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.1
    });

    const MAX_LENGTH_WALL_MATERIAL = new THREE.MeshStandardMaterial({
        ...stoneTextures,
        color: 0xeeeeee, // Slightly different color for the longest wall
        roughness: 0.8,
        metalness: 0.1
    });

    // Helper functions
    const calculateWallLength = (start, end) => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Process DXF entities to identify walls
    const processedEntities = useMemo(() => {
        if (entities.length === 0) return [];

        let maxLength = 0;
        let maxLengthWallIndex = -1;
        const walls = [];

        entities.forEach((entity) => {
            if ((entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') &&
                entity.vertices && entity.vertices.length >= 2) {

                for (let i = 0; i < entity.vertices.length - 1; i++) {
                    const start = new THREE.Vector2(entity.vertices[i].x, entity.vertices[i].y);
                    const end = new THREE.Vector2(entity.vertices[i + 1].x, entity.vertices[i + 1].y);

                    const length = calculateWallLength(start, end);
                    walls.push({
                        start,
                        end,
                        length,
                        isMaxLengthWall: false
                    });

                    if (length > maxLength) {
                        maxLength = length;
                        maxLengthWallIndex = walls.length - 1;
                    }
                }
            }
        });

        if (maxLengthWallIndex !== -1) {
            walls[maxLengthWallIndex].isMaxLengthWall = true;

            // Send the longest wall data to House.jsx
            setLongestWall({
                start: walls[maxLengthWallIndex].start,
                end: walls[maxLengthWallIndex].end,
                length: maxLength
            });
        }

        return walls;
    }, [entities, setLongestWall]);

    // Load DXF file
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/files/dxf-files/iwqPbLCgsntd4Ou9Lbc8Ykot58ESSIw8cXhbd9zn.txt', {
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzNTExOTkwLCJleHAiOjE3NDM1MTU1OTAsIm5iZiI6MTc0MzUxMTk5MCwianRpIjoiNWhFQW9kNlVpQmU4UE9DayIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.rJYuHZb1ZCUuFXlGFO42zB-_8INhwGJH0gEbhym_gz8`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch DXF file');
                return response.text();
            })
            .then(dxfData => {
                const parser = new DxfParser();
                try {
                    const parsedDxf = parser.parseSync(dxfData);
                    setEntities(parsedDxf.entities);
                } catch (error) {
                    console.error('Error parsing DXF file:', error);
                }
            })
            .catch(error => {
                console.error('Error fetching DXF file:', error);
            });
    }, []);

    // Entity component - handles rendering of each wall
    const Entity = ({ wall }) => {
        const wallMaterial = wall.isMaxLengthWall ? MAX_LENGTH_WALL_MATERIAL : WALL_MATERIAL;
        const wallHeight = 5; // Set a fixed height for the walls

        // Calculate length of the wall for texture mapping
        const wallLength = wall.length;

        // Create a 2D shape for the wall based on the start and end points
        const shape = new THREE.Shape();
        shape.moveTo(wall.start.x, wall.start.y);
        shape.lineTo(wall.end.x, wall.end.y);

        // Create the 3D extrusion from the shape
        const extrudeSettings = {
            steps: 1,
            depth: wallHeight,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // Update UVs for proper texture mapping based on wall dimensions
        geometry.computeBoundingBox();
        const size = new THREE.Vector3();
        geometry.boundingBox.getSize(size);

        geometry.attributes.uv.needsUpdate = true;

        // Calculate the wall direction for texture alignment
        const direction = new THREE.Vector2()
            .subVectors(wall.end, wall.start)
            .normalize();

        return (
            <mesh
                geometry={geometry}
                position={[0, 0, 0]}
                material={wallMaterial}
                castShadow
                receiveShadow
            />
        );
    };

    return (
        <Suspense fallback={<Loader />}>
            <group position={position} scale={scale} rotation={[0, 0, 0]}>
                {/* Render all walls */}
                {processedEntities.map((wall, index) => (
                    <Entity key={index} wall={wall} />
                ))}
            </group>
        </Suspense>
    );
};

export default DXFModel;