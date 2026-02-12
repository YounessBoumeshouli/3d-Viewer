import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect, useState, useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import api from "./../../services/api.js";


const WindowModel = ({ windowPath, targetWidth = 1.5 }) => {
    const gltf = useLoader(GLTFLoader, windowPath);
    const [transform, setTransform] = useState({
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        offset: [0, 0, 0]
    });

    useEffect(() => {
        if (gltf.scene) {
            
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            box.getSize(size);
            box.getCenter(center);

            
            
            

            let rotX = 0;
            let rotY = 0;
            let rotZ = 0;
            let modelWidth = size.x; 

            const dims = [
                { axis: 'x', val: size.x },
                { axis: 'y', val: size.y },
                { axis: 'z', val: size.z }
            ];

            
            dims.sort((a, b) => a.val - b.val);
            const thicknessAxis = dims[0].axis; 

            
            if (thicknessAxis === 'x') {
                
                
                rotY = -Math.PI / 2;
                modelWidth = size.z; 
            } else if (thicknessAxis === 'y') {
                
                
                rotX = Math.PI / 2;
                modelWidth = size.x; 
            } else {
                
                modelWidth = size.x;
            }

            
            
            const scaleFactor = modelWidth > 0 ? targetWidth / modelWidth : 1;

            
            
            setTransform({
                scale: [scaleFactor, scaleFactor, scaleFactor],
                rotation: [rotX, rotY, rotZ],
                offset: [-center.x, -center.y, -center.z]
            });
        }
    }, [gltf.scene, targetWidth]);

    
    const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    return (
        <group rotation={transform.rotation} scale={transform.scale}>
            <primitive object={scene} position={transform.offset} />
        </group>
    );
};


const Window = ({ wallStart, wallEnd, position, path, stage }) => {
    const [windowPath, setWindowPath] = useState(null);
    const [modelError, setModelError] = useState(null);
    const [coords, setCoords] = useState({ pos: [0, 0, 0], rot: 0 });
    const [isReady, setIsReady] = useState(false);
    const lastFetchedPath = useRef(null);

    
    useEffect(() => {
        if (path) {
            localStorage.setItem("window", path);
            fetchModel();
        }
    }, [path]);

    const fetchModel = async () => {
        try {
            const storedWindow = localStorage.getItem("window");
            if (!storedWindow || storedWindow === "null") return;
            if (storedWindow === lastFetchedPath.current) return;

            lastFetchedPath.current = storedWindow;
            let image = storedWindow.split("/");
            const response = await api.get(`storage-proxy/components/${image[1]}/${image[2]}`, {
                responseType: "blob",
            });

            if (windowPath && windowPath.startsWith("blob:")) URL.revokeObjectURL(windowPath);
            const blobURL = URL.createObjectURL(response.data);
            setWindowPath(blobURL);
            setIsReady(true);
        } catch (error) {
            console.error("Error loading GLB:", error);
            setModelError(error.message);
        }
    };

    useEffect(() => {
        const onLocalStorageChange = () => fetchModel();
        window.addEventListener('local-storage', onLocalStorageChange);
        return () => window.removeEventListener('local-storage', onLocalStorageChange);
    }, []);

    
    useEffect(() => {
        if (!wallStart || !wallEnd) return;

        
        let p1 = { x: wallStart[0], y: wallStart[1] };
        let p2 = { x: wallEnd[0], y: wallEnd[1] };

        if (p1.x > p2.x || (Math.abs(p1.x - p2.x) < 0.01 && p1.y > p2.y)) {
            [p1, p2] = [p2, p1];
        }

        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const dirX = dx / len;
        const dirY = dy / len;

        
        let centerX = (p1.x + p2.x) / 2;
        let centerY = (p1.y + p2.y) / 2;
        const offsetAmt = len * 0.25;

        if (position === "left") {
            centerX -= dirX * offsetAmt;
            centerY -= dirY * offsetAmt;
        } else if (position === "right") {
            centerX += dirX * offsetAmt;
            centerY += dirY * offsetAmt;
        }

        
        const floorHeight = 3;
        const sillHeight = 1.2;
        const finalZ = ((stage || 1) - 1) * floorHeight + sillHeight;

        
        const angle = Math.atan2(dy, dx);

        setCoords({
            pos: [centerX, centerY, finalZ],
            rot: angle
        });

    }, [wallStart, wallEnd, position, stage]);

    if (!wallStart || !wallEnd || !isReady || !windowPath) return null;

    return (
        <Suspense fallback={null}>
            {}
            <group position={coords.pos} rotation={[0, 0, coords.rot]}>

                {}
                <group rotation={[Math.PI / 2, 0, 0]}>

                    {}
                    <WindowModel windowPath={windowPath} targetWidth={1.5} />

                </group>

            </group>
        </Suspense>
    );
};

export default Window;