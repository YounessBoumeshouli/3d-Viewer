import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect, useState, useRef, Suspense } from "react";
import api from "./../../services/api.js";
const WindowModel = ({ windowPath, position, rotation, scale }) => {
    const gltf = useLoader(GLTFLoader, windowPath);
    console.log(position)
    return (
        <primitive
            object={gltf.scene}
            position={position}
            rotation={rotation}
            scale={[scale, scale, scale]}
        />
    );
};
const Window = ({ wallStart, wallEnd, position , path, stage }) => {
    const [windowPath, setWindowPath] = useState(null);
    const [modelError, setModelError] = useState(null);
    const [scale, setScale] = useState(0.3);
    const [windowPosition, setWindowPosition] = useState([0, 0, 0]);
    const instanceId = useRef(Math.random().toString(36).substring(7));
    const [angle, setAngle] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const lastFetchedPath = useRef(null);

    useEffect(() => {
        console.log(path)
        if (path) {
            console.log(path)
            localStorage.setItem("window", path);
            fetchModel();

        }
    }, [path]);

    const fetchModel = async () => {
        console.log('fetch model is running ')
        console.log(localStorage.getItem("window"))
        try {
            const storedWindow = localStorage.getItem("window");

            if (!storedWindow || storedWindow === "null") {
                console.log("*********************No window model in localStorage*****************************")
                setModelError("No window model in localStorage");
                return;
            }if (storedWindow === lastFetchedPath.current) {
                console.log("Model already fetched, skipping...");
                return;
            }

            lastFetchedPath.current = storedWindow;

            let image = storedWindow.split("/");
            const response = await api.get(`storage-proxy/components/${image[1]}/${image[2]}`, {
                responseType: "blob",
            });

            if (windowPath && windowPath.startsWith("blob:")) {
                URL.revokeObjectURL(windowPath);
            }

            const blobURL = URL.createObjectURL(response.data);
            setWindowPath(blobURL);
            setIsReady(true);
        } catch (error) {
            console.error("Error loading GLB:", error);
            setModelError(error.message);
        }
    };

    useEffect(() => {
        return () => {
            if (windowPath && windowPath.startsWith("blob:")) {
                URL.revokeObjectURL(windowPath);
            }
        };
    }, [windowPath]);
    useEffect(() => {
        const onLocalStorageChange = (e) => {
            console.log('$$$$$$$$$$$$$$$$$$window change$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
            fetchModel()
        };

        window.addEventListener('local-storage', onLocalStorageChange);

        return () => {
            window.removeEventListener('local-storage', onLocalStorageChange);
        };
    }, []);

    useEffect(() => {
        if (!wallStart || !wallEnd) return;
        console.log(stage)
        const wallLength = Math.sqrt(
            Math.pow(wallEnd[0] - wallStart[0], 2) +
            Math.pow(wallEnd[1] - wallStart[1], 2)
        );

        const dirX = wallEnd[0] - wallStart[0];
        const dirY = wallEnd[1] - wallStart[1];

        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        const normDirX = dirX / length;
        const normDirY = dirY / length;

        const centerX = (wallStart[0] + wallEnd[0]) / 2;
        const centerY = (wallStart[1] + wallEnd[1]) / 2;

        let offsetX = 0;
        let offsetY = 0;
        const offsetDistance = wallLength * 0.25;



       if (stage === 0 ){
           if (position === "left") {
               offsetX = -normDirX * offsetDistance+1;
               offsetY = -normDirY * offsetDistance+0.6;
           } else if (position === "right") {
               offsetX = normDirX * offsetDistance+4;
               offsetY = normDirY * offsetDistance+2.4;
           }
           console.log('############ stage :',stage)

           setWindowPosition([
               centerX + offsetX,
                1.2,
               -(centerY + offsetY)
           ]);
       }else {
           if (position === "left") {
               offsetX = -normDirX * offsetDistance;
               offsetY = -normDirY * offsetDistance;
           } else if (position === "right") {
               offsetX = normDirX * offsetDistance;
               offsetY = normDirY * offsetDistance;
           }
           console.log('############ stage :',stage)
           setWindowPosition([
               centerX + offsetX,
               stage * 3 + 2,
               -(centerY + offsetY)
           ]);
       }

        if (wallLength > 0) {
            const maxWindowWidth = 1.5;
            const calculatedScale = maxWindowWidth / wallLength + 1;
            const minScale = 0.5;
            setScale(Math.max(minScale, calculatedScale));
        }

        const newAngle = Math.atan2(wallEnd[1] - wallStart[1], wallEnd[0] - wallStart[0]);
        setAngle(newAngle);

        console.log(`Window ${instanceId.current} calculated position :`, [centerX + offsetX, 2, -(centerY + offsetY)]);
    }, [wallStart, wallEnd, position, stage]);

    if (!wallStart || !wallEnd) {
        return null;
    }

    if (modelError) {
        console.warn(`Window ${instanceId.current} model error:`, modelError);
        return null;
    }

    if (!isReady || !windowPath) {
        return null;
    }
    return (
        <Suspense fallback={null}>
            {stage != null &&
                <WindowModel
                    windowPath={windowPath}
                    position={windowPosition}
                    rotation={[0, angle, 0]}
                    scale={scale}
                />
            }
        </Suspense>
    );
};

export default Window;