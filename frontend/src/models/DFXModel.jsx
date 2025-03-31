    import React, { Suspense, useEffect, useState, useMemo } from 'react';
    import * as THREE from 'three';
    import { DxfParser } from 'dxf-parser';
    import Loader from '../components/Loader';

    // Constants for materials
    const WALL_MATERIAL = new THREE.MeshStandardMaterial({
        color: 0x00ff00, // Green for normal walls
        roughness: 0.7,
        metalness: 0.1
    });

    const MAX_LENGTH_WALL_MATERIAL = new THREE.MeshStandardMaterial({
        color: 0x0000ff, // Blue for the longest wall
        roughness: 0.7,
        metalness: 0.1
    });

    // Helper functions
    const calculateWallLength = (start, end) => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Main DXFModel component
    const DXFModel = ({ scale = [1, 1, 1], position = [0, 0, 0], setLongestWall }) => {
        const [entities, setEntities] = useState([]);

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

                // ✅ Send the longest wall data to House.jsx
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
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzNDMwMjM5LCJleHAiOjE3NDM0MzM4MzksIm5iZiI6MTc0MzQzMDIzOSwianRpIjoiVVV6NTlyWEd2VzFYQnpSRCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.PVu-ERpwEuOdbU_FR0JV5S6_KlqDLiBrEht-_aRCfH4`
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

        return (
            <Suspense fallback={<Loader />}>
                <group position={position} scale={scale} rotation={[0, 0, 0]}> {/* Remove rotation */}
                    <Scene entities={processedEntities} />
                </group>
            </Suspense>
        );
    };

    // Scene component to render walls
    const Scene = ({ entities }) => {
        return (
            <>
                {/* Render all walls */}
                {entities.map((wall, index) => (
                    <Entity key={index} wall={wall} />
                ))}
            </>
        );
    };

    // Entity component - handles rendering of each wall
    const Entity = ({ wall }) => {
        const wallMaterial = wall.isMaxLengthWall ? MAX_LENGTH_WALL_MATERIAL : WALL_MATERIAL;

        const wallHeight = 5; // Set a fixed height for the walls

        // Create a 2D shape for the wall based on the start and end points
        const shape = new THREE.Shape();
        shape.moveTo(wall.start.x, wall.start.y);
        shape.lineTo(wall.end.x, wall.end.y);

        // Create the 3D extrusion from the shape
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: wallHeight,
            bevelEnabled: false
        });

        return (
            <mesh
                geometry={geometry}
                position={[0, 0, 0]} // Position walls at the origin
                material={wallMaterial}
                castShadow
                receiveShadow
            />
        );
    };

    export default DXFModel;
