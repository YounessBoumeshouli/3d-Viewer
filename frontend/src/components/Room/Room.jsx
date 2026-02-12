import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Room = ({ shapePoints, stage = 1 }) => {
    
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

    
    useMemo(() => {
        [floorTextures, wallTextures].forEach(textures => {
            Object.values(textures).forEach(t => {
                t.wrapS = t.wrapT = THREE.RepeatWrapping;
            });
        });
        
        
        Object.values(wallTextures).forEach(t => t.repeat.set(2, 1));
    }, [floorTextures, wallTextures]);


    
    const { floorGeometry, wallSegments } = useMemo(() => {
        if (!shapePoints || shapePoints.length < 3) return { floorGeometry: null, wallSegments: [] };

        
        const shape = new THREE.Shape();
        shape.moveTo(shapePoints[0].x, shapePoints[0].y);
        shapePoints.slice(1).forEach(p => shape.lineTo(p.x, p.y));
        shape.closePath();

        const fGeo = new THREE.ShapeGeometry(shape);

        
        fGeo.computeBoundingBox();
        const box = fGeo.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        
        Object.values(floorTextures).forEach(t => t.repeat.set(size.x / 2, size.y / 2));


        
        const segments = [];
        const wallHeight = 3; 
        const wallThickness = 0.2;

        for (let i = 0; i < shapePoints.length; i++) {
            const p1 = shapePoints[i];
            const p2 = shapePoints[(i + 1) % shapePoints.length]; 

            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            const centerX = (p1.x + p2.x) / 2;
            const centerY = (p1.y + p2.y) / 2;

            segments.push({
                position: [centerX, centerY, (stage - 1) * 3 + wallHeight / 2], 
                rotation: [0, 0, angle], 
                args: [len, wallThickness, wallHeight] 
            });
        }

        return { floorGeometry: fGeo, wallSegments: segments };
    }, [shapePoints, floorTextures]);

    if (!floorGeometry) return null;

    return (
        <group>
            {}
            <mesh
                geometry={floorGeometry}
                position={[0, 0, (stage - 1) * 3 + 0.02]}
                receiveShadow
            >
                <meshStandardMaterial {...floorTextures} side={THREE.DoubleSide} />
            </mesh>

            {}
            {wallSegments.map((seg, i) => (
                <mesh
                    key={i}
                    position={seg.position}
                    rotation={seg.rotation}
                    castShadow
                    receiveShadow
                >
                    {}
                    <boxGeometry args={seg.args} />
                    <meshStandardMaterial {...wallTextures} />
                </mesh>
            ))}
        </group>
    );
};

export default Room;