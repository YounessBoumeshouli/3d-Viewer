import React, { Suspense, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import Sky from "../models/Sky.jsx";
import { Loader, useTexture } from "@react-three/drei";
import DXFModel from '../models/DFXModel.jsx';
import Door from '../components/Door/Door.jsx';
import * as THREE from "three";
import Window from "../components/Window/Window.jsx";
import Table from "../components/table/Table.jsx";

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
            <meshStandardMaterial
                {...floorTextures}
                color={0xffffff}
                roughness={0.8}
            />
        </mesh>
    );
};

const CameraController = () => {
    const { camera, gl } = useThree();
    const keys = useRef({});

    const moveSpeed = 0.15;
    const lookSpeed = 0.002;

    useEffect(() => {
        const handleKeyDown = (e) => {
            keys.current[e.code] = true;
        };

        const handleKeyUp = (e) => {
            keys.current[e.code] = false;
        };

        const handleMouseMove = (e) => {
            if (e.buttons === 2) {
                camera.rotation.y -= e.movementX * lookSpeed;
                camera.rotation.x -= e.movementY * lookSpeed;
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
            }
        };

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

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
        if (keys.current['Space']) camera.position.y += moveSpeed;
        if (keys.current['ShiftLeft']) camera.position.y -= moveSpeed;
    });

    return null;
};

const House = forwardRef(({ file, components, height, onCanvasReady }, ref) => {
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
        if (longestWall) {
            setLoading(false);
        }
    }, [longestWall]);

    const onCreated = ({ gl, scene: threeScene, camera: threeCamera }) => {
        setRenderer(gl);
        setScene(threeScene);
        setCamera(threeCamera);
        if (onCanvasReady) {
            setTimeout(() => onCanvasReady(), 100);
        }
    };

    useImperativeHandle(ref, () => ({
        getRenderer: () => renderer,
        getScene: () => scene,
        getCamera: () => camera,
        updateScene: () => {
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        },
        getCanvas: () => renderer?.domElement || null
    }));

    return (
        <>
            {loading && <Loader />}
            <div className="w-full h-screen">
                <Canvas
                    className="w-full h-screen bg-transparent threejs-canvas"
                    camera={{ position: [10, 5, 10], fov: 75, near: 0.1, far: 1000 }}
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
                            <DXFModel scale={islandScale} position={islandPosition} setLongestWall={setLongestWall} file={file} wallH={height} />
                        </group>

                        {longestWall && (
                            <>
                                <Door
                                    wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                    wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                    path={selectedComponent.find(item => item.category === "door")?.path}
                                />
                                <Table
                                    wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                    wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                />
                            </>
                        )}

                        {longestWall && height && (
                            <>
                                {Array.from({ length: height }, (_, i) => (
                                    <React.Fragment key={i}>
                                        <Window
                                            wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                            wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                            position="left"
                                            key={`left-window-${i}`}
                                            stage={i}
                                            path={selectedComponent.find(item => item.category === "window")?.path}
                                        />
                                        <Window
                                            wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                            wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                            position="right"
                                            key={`right-window-${i}`}
                                            path={selectedComponent.find(item => item.category === "window")?.path}
                                            stage={i}
                                        />
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
});

export default House;