import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect, useState, useRef, Suspense } from "react";
import api from "./../../services/api.js";

// Separate loader component handles the async GLTF loading
const WindowModel = ({ windowPath, position, rotation, scale }) => {
    const gltf = useLoader(GLTFLoader, windowPath);

    return (
        <primitive
            object={gltf.scene}
            position={position}
            rotation={rotation}
            scale={[scale, scale, scale]}
        />
    );
};

// Main component that handles state and calculations
const Window = ({ wallStart, wallEnd, position = "center", path, stage }) => {
    const [windowPath, setWindowPath] = useState(null);
    const [modelError, setModelError] = useState(null);
    const [scale, setScale] = useState(0.3);
    const [windowPosition, setWindowPosition] = useState([0, 0, 0]);
    const instanceId = useRef(Math.random().toString(36).substring(7));
    const [angle, setAngle] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const lastFetchedPath = useRef(null);

    useEffect(() => {
        if (path) {
            localStorage.setItem("window", path);
        } else if (localStorage.getItem("window") !== null) {
            localStorage.setItem("window", null);
        }
    }, [path]);

    const fetchModel = async () => {
        try {
            const storedWindow = localStorage.getItem("window");

            if (storedWindow === lastFetchedPath.current && windowPath) {
                return;
            }

            if (!storedWindow || storedWindow === "null") {
                setModelError("No window model in localStorage");
                return;
            }

            console.log("Fetching window model:", storedWindow);
            lastFetchedPath.current = storedWindow;

            let image = storedWindow.split("/");
            const response = await api.get(`image/${image[1]}/${image[2]}`, {
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
        fetchModel();

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            const oldValue = localStorage.getItem(key);
            originalSetItem.apply(this, arguments);
            if (key === "window" && oldValue !== value) {
                const event = new Event("windowChanged");
                window.dispatchEvent(event);
            }
        };

        const handleWindowChanged = () => {
            console.log("🔄 Window selection changed");
            fetchModel();
        };

        window.addEventListener("windowChanged", handleWindowChanged);
        window.addEventListener("storage", (event) => {
            if (event.key === "window") {
                handleWindowChanged();
            }
        });

        return () => {
            localStorage.setItem = originalSetItem;
            window.removeEventListener("windowChanged", handleWindowChanged);
            window.removeEventListener("storage", handleWindowChanged);
        };
    }, []);

    useEffect(() => {
        if (!wallStart || !wallEnd) return;

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

        if (position === "left") {
            offsetX = -normDirX * offsetDistance;
            offsetY = -normDirY * offsetDistance;
        } else if (position === "right") {
            offsetX = normDirX * offsetDistance;
            offsetY = normDirY * offsetDistance;
        }

        setWindowPosition([
            centerX + offsetX,
            stage * 3 + 3,
            -(centerY + offsetY)
        ]);

        if (wallLength > 0) {
            const maxWindowWidth = 1.5;
            const calculatedScale = maxWindowWidth / wallLength + 1;
            const minScale = 0.5;
            setScale(Math.max(minScale, calculatedScale));
        }

        const newAngle = Math.atan2(wallEnd[1] - wallStart[1], wallEnd[0] - wallStart[0]);
        setAngle(newAngle);

        console.log(`Window ${instanceId.current} calculated position:`, [centerX + offsetX, 2, -(centerY + offsetY)]);
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
            <WindowModel
                windowPath={windowPath}
                position={windowPosition}
                rotation={[0, angle, 0]}
                scale={scale}
            />
        </Suspense>
    );
};

export default Window;