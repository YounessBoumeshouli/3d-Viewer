import React, { Suspense, useEffect, useState, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import Sky from "../models/Sky.jsx";
import { Loader, useTexture } from "@react-three/drei";
import DXFModel from '../models/DFXModel.jsx';
import Door from '../components/Door/Door.jsx';
import * as THREE from "three";
import Window from "../components/Window/Window.jsx";
import Table from "../components/table/Table.jsx";
import Room from "../components/Room/Room.jsx";

// --- GENERIC SNAP HELPER (Used for Doors and Windows) ---
const calculateElementCoordinates = (point, walls, width = 1.0) => {
    if (!walls || walls.length === 0) {
        return {
            start: [point.x - width/2, point.y, 0],
            end: [point.x + width/2, point.y, 0]
        };
    }

    let minDistance = Infinity;
    let bestWall = null;
    let bestPoint = { x: point.x, y: point.y };

    // 1. Find the wall segment closest to the click
    walls.forEach(wall => {
        const A = wall.start;
        const B = wall.end;
        const P = point;

        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const lenSq = dx * dx + dy * dy;

        let t = ((P.x - A.x) * dx + (P.y - A.y) * dy) / lenSq;
        t = Math.max(0, Math.min(1, t));

        const closestX = A.x + t * dx;
        const closestY = A.y + t * dy;

        const distSq = (P.x - closestX) ** 2 + (P.y - closestY) ** 2;

        if (distSq < minDistance) {
            minDistance = distSq;
            bestWall = wall;
            bestPoint = { x: closestX, y: closestY };
        }
    });

    // 2. Create a segment centered on that point, aligned with the wall
    if (bestWall) {
        const dx = bestWall.end.x - bestWall.start.x;
        const dy = bestWall.end.y - bestWall.start.y;
        const angle = Math.atan2(dy, dx);

        const half = width / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            start: [bestPoint.x - half * cos, bestPoint.y - half * sin, 0],
            end: [bestPoint.x + half * cos, bestPoint.y + half * sin, 0]
        };
    }

    return {
        start: [point.x - width/2, point.y, 0],
        end: [point.x + width/2, point.y, 0]
    };
};

const Floor = () => {
    const floorTextures = useTexture({
        map: '/textures/floor/wooden_floor_diffuse.jpg',
        normalMap: '/textures/floor/wooden_floor_normal.jpg',
        roughnessMap: '/textures/floor/wooden_floor_roughness.jpg',
        aoMap: '/textures/floor/wooden_floor_ambient_occlusion.jpg',
    });

    Object.values(floorTextures).forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial {...floorTextures} color={0xffffff} roughness={0.8} />
        </mesh>
    );
};

const CameraController = () => {
    const { camera, gl } = useThree();
    const keys = useRef({});
    const moveSpeed = 0.15;
    const lookSpeed = 0.002;

    useEffect(() => {
        const handleKeyDown = (e) => keys.current[e.code] = true;
        const handleKeyUp = (e) => keys.current[e.code] = false;

        const handleMouseMove = (e) => {
            if (e.buttons === 2) {
                camera.rotation.y -= e.movementX * lookSpeed;
                camera.rotation.x -= e.movementY * lookSpeed;
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
            }
        };

        const handleContextMenu = (e) => e.preventDefault();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        gl.domElement.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
            gl.domElement.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [camera, gl]);

    useFrame(() => {
        const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion).multiplyScalar(moveSpeed);
        const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(moveSpeed);

        if (keys.current['KeyW']) camera.position.add(forward);
        if (keys.current['KeyS']) camera.position.sub(forward);
        if (keys.current['KeyA']) camera.position.sub(right);
        if (keys.current['KeyD']) camera.position.add(right);
        if (keys.current['KeyE']) camera.position.y += moveSpeed;
        if (keys.current['ShiftLeft']) camera.position.y -= moveSpeed;
    });

    return null;
};

const House = forwardRef(({ file, components, height, onCanvasReady, userDesign, preParsedWalls }, ref) => {
    const [longestWall, setLongestWall] = useState(null);
    const [loading, setLoading] = useState(true);
    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState([]);

    useEffect(() => {
        if (Array.isArray(components) && components.length > 0) {
            const data = components.map((component) => ({
                category: component.component?.category?.name || component.category,
                path: component.component?.path || component.path
            }));
            setSelectedComponent(data);
        }
    }, [components]);

    const adjustIslandForScreenSize = () => {
        let screenScale = window.innerWidth <= 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];
        return [screenScale, [0, 0, 0]];
    };

    const [islandScale, islandPosition] = adjustIslandForScreenSize();

    useEffect(() => {
        if (longestWall) setLoading(false);
    }, [longestWall]);

    const onCreated = ({ gl, scene: threeScene, camera: threeCamera }) => {
        setRenderer(gl);
        setScene(threeScene);
        setCamera(threeCamera);
        if (onCanvasReady) setTimeout(() => onCanvasReady(), 100);
    };

    useImperativeHandle(ref, () => ({
        getRenderer: () => renderer,
        getScene: () => scene,
        getCamera: () => camera,
        updateScene: () => {
            if (renderer && scene && camera) renderer.render(scene, camera);
        },
        getCanvas: () => renderer?.domElement || null
    }));

    // 1. CALCULATE DOORS (Snap to wall)
    const calculatedDoors = useMemo(() => {
        if (!userDesign?.doors) return [];
        return userDesign.doors.map(door => {
            const coords = calculateElementCoordinates(door, preParsedWalls || [], 1.0); // 1m width
            return { ...door, wallStart: coords.start, wallEnd: coords.end };
        });
    }, [userDesign?.doors, preParsedWalls]);

    // 2. CALCULATE WINDOWS (Snap to wall)
    const calculatedWindows = useMemo(() => {
        if (!userDesign?.windows) return [];
        return userDesign.windows.map(win => {
            // Windows are usually wider, e.g., 1.5m
            const coords = calculateElementCoordinates(win, preParsedWalls || [], 1.5);
            return { ...win, wallStart: coords.start, wallEnd: coords.end };
        });
    }, [userDesign?.windows, preParsedWalls]);

    return (
        <>
            {loading && <Loader />}
            <div className="w-full h-screen">
                <Canvas
                    className="w-full h-screen bg-transparent threejs-canvas"
                    camera={{ position: [10, 15, 10], fov: 50, near: 0.1, far: 1000 }}
                    shadows
                    onCreated={onCreated}
                >
                    <primitive object={new AxesHelper(100)} />
                    <primitive object={new GridHelper(100, 100)} />

                    <CameraController />
                    <Sky />
                    <Floor />

                    <Suspense fallback={null}>
                        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow>
                            <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
                        </directionalLight>
                        <ambientLight intensity={0.4} />
                        <hemisphereLight intensity={0.3} groundColor="#080820" />

                        <group rotation={[-Math.PI / 2, 0, 0]}>
                            <DXFModel
                                scale={islandScale}
                                position={islandPosition}
                                setLongestWall={setLongestWall}
                                file={file}
                                wallH={height}
                            />

                            {/* RENDER USER ELEMENTS */}

                            {/* RENDER USER DRAWN ROOMS */}
                            {userDesign?.rooms?.map((roomPoints, index) => (
                                <Room
                                    key={`room-${index}`}
                                    shapePoints={roomPoints} // Pass the array of points
                                />
                            ))}

                            {calculatedDoors.map((door) => (
                                <Door
                                    key={door.id}
                                    wallStart={door.wallStart}
                                    wallEnd={door.wallEnd}
                                    path={selectedComponent.find(item => item.category === "door")?.path}
                                />
                            ))}

                            {/* RENDER CALCULATED WINDOWS */}
                            {calculatedWindows.map((win) => (
                                <Window
                                    key={win.id}
                                    wallStart={win.wallStart}
                                    wallEnd={win.wallEnd}
                                    // "Left" or "Right" doesn't matter here because our
                                    // wallStart/End is a small segment CENTERED on the click.
                                    // So the window will appear exactly where clicked.
                                    path={selectedComponent.find(item => item.category === "window")?.path}
                                    stage={0} // Default to ground floor, extend logic if you have floors
                                />
                            ))}
                        </group>
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
});

export default House;