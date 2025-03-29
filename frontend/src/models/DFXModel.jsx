import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import Loader from '../components/Loader';
import { DxfParser } from 'dxf-parser';
const DXFModel = () => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/files/dxf-files/BwXYdeqq7dDUCAajWibgzggsJVIZbswG4jyjIH2O.txt',{
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQzMjUyNDA1LCJleHAiOjE3NDMyNTYwMDUsIm5iZiI6MTc0MzI1MjQwNSwianRpIjoiTGpPUm56RFpSSE1IU3p6aiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.elwvHS3FVCd2QO1VN3inJ0-HaCWyOsj4ovFW2-oh6Kg` // Add this line
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
            <Scene entities={entities} />
        </Suspense>
    );
};

const Scene = ({ entities }) => {
    return (
        <>
            <axesHelper args={[1000]} />
            <gridHelper args={[1000, 100]} />
            {entities.map((entity, index) => (
                <Entity key={index} entity={entity} />
            ))}
        </>
    );
};

const Entity = ({ entity }) => {
    // Placeholder for useGLTF if needed
    const { nodes, materials } = useGLTF('/foxs_islands.glb'); // Replace with actual path
    switch (entity.type) {
        case 'LINE':
            return entity.start && entity.end ? (
                <line>
                    <bufferGeometry attach="geometry">
                        <float32BufferAttribute
                            attach="attributes-position"
                            array={new Float32Array([
                                entity.start.x, entity.start.y, entity.start.z || 0,
                                entity.end.x, entity.end.y, entity.end.z || 0
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color={0x000000} />
                </line>
            ) : null;

        case 'SPLINE':
            return entity.controlPoints ? (
                <line>
                    <bufferGeometry attach="geometry">
                        <float32BufferAttribute
                            attach="attributes-position"
                            array={new Float32Array(
                                entity.controlPoints.flatMap(cp => [cp.x, cp.y, cp.z || 0])
                            )}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color={0x000000} />
                </line>
            ) : null;

        case 'CIRCLE':
            return entity.center && entity.radius ? (
                <mesh position={[entity.center.x, entity.center.y, entity.center.z || 0]}>
                    <circleGeometry args={[entity.radius, 32]} />
                    <meshBasicMaterial attach="material" color={0x000000} />
                </mesh>
            ) : null;

        case 'ARC':
            return entity.center && entity.radius && entity.startAngle && entity.endAngle ? (
                <line>
                    <bufferGeometry attach="geometry">
                        <float32BufferAttribute
                            attach="attributes-position"
                            array={new Float32Array(
                                Array.from({ length: 100 }, (_, i) => {
                                    const angle = entity.startAngle + (entity.endAngle - entity.startAngle) * (i / 100);
                                    return [
                                        entity.center.x + entity.radius * Math.cos(angle),
                                        entity.center.y + entity.radius * Math.sin(angle),
                                        entity.center.z || 0
                                    ];
                                }).flat()
                            )}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color={0x000000} />
                </line>
            ) : null;

        case 'LWPOLYLINE':
        case 'POLYLINE':
            return entity.vertices ? (
                <group >
                    <mesh rotation={new THREE.Euler(Math.PI / 2, 0, 0)} position={new THREE.Vector3(0, 10, 0)}>
                        <extrudeGeometry args={[
                            new THREE.Shape(
                                entity.vertices.map(v => new THREE.Vector2(v.x , v.y ))
                            ),
                            {
                                steps: 1,
                                depth: 10,
                                bevelEnabled: false
                            }
                        ]} />
                        <meshLambertMaterial
                            attach="material"
                            color={0x468585}
                            emissive={0x468585}
                        />
                    </mesh>
                    {nodes && materials && (
                        <>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.pCylinder92_wood_0.geometry}
                                material={materials.wood}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.polySurface38_wood_0.geometry}
                                material={materials.wood}
                            />
                            <group
                                position={[-0.686, 13.571, 2.281]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={[2.34, 3.321, 4.929]}>
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.polySurface16_roof1_0.geometry}
                                    material={materials.roof1}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.polySurface16_windows_background_0.geometry}
                                    material={materials.windows_background}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.polySurface16_roof3_0.geometry}
                                    material={materials.roof3}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.polySurface17_windows_frame_0.geometry}
                                    material={materials.windows_frame}
                                />
                            </group>

                        </>
                    )}
                </group>
            ) : null;

        case 'TEXT':
            return entity.text && entity.position ? (
                <mesh position={[entity.position.x, entity.position.y, entity.position.z || 0]}>
                    <textGeometry args={[entity.text, { size: 5, height: 1, font: 'helvetiker' }]} />
                    <meshBasicMaterial attach="material" color={0x000000} />
                </mesh>
            ) : null;

        case '3DFACE':
            return entity.vertices && entity.vertices.length >= 3 ? (
                <mesh>
                    <bufferGeometry attach="geometry">
                        <float32BufferAttribute
                            attach="attributes-position"
                            array={new Float32Array(
                                entity.vertices.flatMap(v => [v.x, v.y, v.z || 0])
                            )}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <meshBasicMaterial attach="material" color={0x000000} side={THREE.DoubleSide} />
                </mesh>
            ) : null;

        default:
            return null;
    }
};

export default DXFModel;