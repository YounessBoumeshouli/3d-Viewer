import React, { useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Table = ({ wallStart, wallEnd }) => {

    const [tablePath, setTablePath] = useState(null);

    const loadTableTexture = () => {
        const storedTable = localStorage.getItem("table");

        if (storedTable) {
            let image = storedTable.split("/");
            const localURL = `/textures/table/${image[2]}`;
            const backendURL = `http://127.0.0.1:8000/api/image/${image[1]}/${image[2]}`;

            const img = new Image();
            img.src = localURL;
            img.onload = () => {
                setTablePath(localURL);
            };
            img.onerror = () => {

                fetch(backendURL)
                    .then((response) => {
                        if (!response.ok) throw new Error("Image not found on backend");
                        return response.blob();
                    })
                    .then((blob) => {
                        const objectURL = URL.createObjectURL(blob);
                        setTablePath(objectURL); // Use object URL
                    })
                    .catch((error) => {
                        console.error("⚠️ Error downloading image:", error);
                    });
            };
        } else {
            setTablePath(null);
        }
    };

    // Initial load
    useEffect(() => {
        loadTableTexture();

        const handleStorageChange = (event) => {
            if (event.key === "table") {
                loadTableTexture();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleSameTabChange = () => {
            const customEvent = new Event("tableChanged");
            window.dispatchEvent(customEvent);
        };

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === "table") {
                handleSameTabChange();
            }
        };

        const handleTableChanged = () => {
            loadTableTexture();
        };
        window.addEventListener("doorChanged", handleTableChanged);

        return () => {
            localStorage.setItem = originalSetItem;
            window.removeEventListener("doorChanged", handleTableChanged);
        };
    }, []);

    if (!wallStart || !wallEnd) return null;

    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const centerZ = (startZ + endZ) / 2;

    const angle = Math.atan2(endY - startY, endX - startX);


    const { scene } = useGLTF("/table/table_and_chairs.glb");

    scene.traverse((child) => {
        if (child.isMesh) {
            if (tablePath) {
                const texture = new THREE.TextureLoader().load(tablePath);

                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    color: 0xffffff,
                    roughness: 0.7,
                    metalness: 0.1,
                });
            } else {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xaaaaaa,
                    roughness: 0.7,
                    metalness: 0.1,
                });
            }

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return (
        <primitive
            object={scene}
            position={[centerX-3, -1.56, -centerY-1]}
            rotation={[0, angle, 0]}
            scale={[0.5, 0.5, 0.5]}
        />
    );
};

export default Table;