import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import Sky from "../models/Sky.jsx";
import { Loader, useTexture } from "@react-three/drei";
import DXFModel from '../models/DFXModel.jsx';
import Door from '../components/Door/Door.jsx';
import * as THREE from "three";
import Window from "../components/Window/Window.jsx";
import Table from "../components/table/Table.jsx";

// Floor component with realistic texture

const Floor = () => {
    const floorTextures = useTexture({
        map: '/textures/floor/wooden_floor_diffuse.jpg',
        normalMap: '/textures/floor/wooden_floor_normal.jpg',
        roughnessMap: '/textures/floor/wooden_floor_roughness.jpg',
        aoMap: '/textures/floor/wooden_floor_ambient_occlusion.jpg',
    });

    // Apply texture repetition
    Object.values(floorTextures).forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10); // Repeat the texture
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

// Custom camera controls with keyboard movement and mouse rotation
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
            // Only rotate if right mouse button is pressed
            if (e.buttons === 2) {
                camera.rotation.y -= e.movementX * lookSpeed;
                camera.rotation.x -= e.movementY * lookSpeed;

                // Limit vertical rotation to avoid flipping
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
            }
        };

        // Prevent context menu on right-click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Add event listeners
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        gl.domElement.addEventListener('contextmenu', handleContextMenu);

        return () => {
            // Clean up event listeners
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
            gl.domElement.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [camera, gl]);

    useFrame(() => {
        // Create movement vectors
        const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion).multiplyScalar(moveSpeed);
        const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(moveSpeed);

        // Apply movement based on keys pressed
        if (keys.current['KeyW']) camera.position.add(forward);
        if (keys.current['KeyS']) camera.position.sub(forward);
        if (keys.current['KeyA']) camera.position.sub(right);
        if (keys.current['KeyD']) camera.position.add(right);
        if (keys.current['Space']) camera.position.y += moveSpeed;
        if (keys.current['ShiftLeft']) camera.position.y -= moveSpeed;
    });

    return null;
};

function House({file,components}) {

    const [selectedComponent,setSelectedComponent] = useState([])
    useEffect(() => {
        console.log('########### file #########',file);

        if (Array.isArray(components) && components.length > 0){
                const data =   components.map((component)=>(
                    {
                        category:component.component.category.name,
                        path:component.component.path
                    }

                ));
            setSelectedComponent(data)

        }
    }, [components]);
    useEffect(() => {
        console.log('selected :',selectedComponent)
    }, [selectedComponent]);
    const adjustIslandForScreenSize = () => {
        let screenScale = window.innerWidth <= 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];
        return [screenScale, [0, 0, 0]];
    };

    const [islandScale, islandPosition] = adjustIslandForScreenSize();
    const [longestWall, setLongestWall] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (longestWall) {
            console.log("🟦 Longest Wall Detected!");
            console.log("📍 Start:", longestWall.start);
            console.log("📍 End:", longestWall.end);
            console.log("📏 Length:", longestWall.length);
            setLoading(false);
        }
    }, [longestWall]);

    return (
        <>
            {loading && <Loader />}
            <Canvas
                className="w-full h-screen bg-transparent"
                camera={{ position: [10, 5, 10], fov: 75, near: 0.1, far: 1000 }}
                shadows
            >
                <primitive object={new AxesHelper(100)} />
                <primitive object={new GridHelper(100, 100)} />

                <CameraController />

                <Suspense fallback={null}>
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow>
                        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
                    </directionalLight>
                    <ambientLight intensity={0.4} />
                    <hemisphereLight intensity={0.3} groundColor="#080820" />

                    <Sky />
                    <Floor />

                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <DXFModel scale={islandScale} position={islandPosition} setLongestWall={setLongestWall} file={file}  />
                    </group>

                        {longestWall &&(
                        <>
                            <Door
                                wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                path={        selectedComponent.find(item => item.category === "door")?.path
                                }
                            />
                            <Table
                                wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                            />
                        </>

                    )}
                    {longestWall && (
                        <>
                            <Window
                                wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                position="left"
                                key="left-window"  // Add a key for React to differentiate
                                path={        selectedComponent.find(item => item.category === "window")?.path
                                }
                            />

                            {/* Right window */}
                            <Window
                                wallStart={[longestWall.start.x, longestWall.start.y, 0.5]}
                                wallEnd={[longestWall.end.x, longestWall.end.y, 0.5]}
                                position="right"
                                key="right-window"  // Add a key for React to differentiate
                                path={        selectedComponent.find(item => item.category === "window")?.path
                                }
                            />
                        </>
                    )}
                </Suspense>
            </Canvas>
        </>
    );
}
export default House;