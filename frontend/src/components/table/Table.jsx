import React, { useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Table = ({ wallStart, wallEnd }) => {
    console.log('in table wallstart',wallStart)

    const [tablePath, setTablePath] = useState(null);

    // Function to load the door texture
    const loadTableTexture = () => {
        const storedTable = localStorage.getItem("table");

        if (storedTable) {
            let image = storedTable.split("/");
            console.log("Stored table path:", image[1]);
            const localURL = `/textures/table/${image[2]}`;
            const backendURL = `http://127.0.0.1:8000/api/image/${image[1]}/${image[2]}`;

            // Check if the local file exists first
            const img = new Image();
            img.src = localURL;
            img.onload = () => {
                console.log("✅ Using local image:", localURL);
                setTablePath(localURL);
            };
            img.onerror = () => {
                console.log("❌ Local image not found, downloading...");

                // Fetch from backend and store locally
                fetch(backendURL)
                    .then((response) => {
                        if (!response.ok) throw new Error("Image not found on backend");
                        return response.blob();
                    })
                    .then((blob) => {
                        const objectURL = URL.createObjectURL(blob);
                        console.log("📥 Image downloaded from backend:", objectURL);
                        setTablePath(objectURL); // Use object URL
                    })
                    .catch((error) => {
                        console.error("⚠️ Error downloading image:", error);
                    });
            };
        } else {
            console.log("❌ No stored table in localStorage");
            setTablePath(null); // Reset the table path when nothing is in localStorage
        }
    };

    // Initial load
    useEffect(() => {
        loadTableTexture();

        // Add storage event listener
        const handleStorageChange = (event) => {
            if (event.key === "table") {
                console.log("🔄 Door selection changed in localStorage");
                loadTableTexture();
            }
        };

        // Listen for storage events (only fires when localStorage is changed in OTHER tabs)
        window.addEventListener("storage", handleStorageChange);

        // Clean up listener when component unmounts
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Add a custom event listener for changes in the same tab
    useEffect(() => {
        // Create a custom event listener for same-tab changes
        const handleSameTabChange = () => {
            const customEvent = new Event("tableChanged");
            window.dispatchEvent(customEvent);
        };

        // Override the setItem method to dispatch our custom event
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === "table") {
                handleSameTabChange();
            }
        };

        // Listen for our custom event
        const handleTableChanged = () => {
            console.log("🔄 Door selection changed in same tab");
            loadTableTexture();
        };
        window.addEventListener("doorChanged", handleTableChanged);

        return () => {
            // Restore original setItem
            localStorage.setItem = originalSetItem;
            window.removeEventListener("doorChanged", handleTableChanged);
        };
    }, []);

    if (!wallStart || !wallEnd) return null; // Ensure valid data

    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const centerZ = (startZ + endZ) / 2;

    const angle = Math.atan2(endY - startY, endX - startX);

    // console.log("📍 Placing Table at:", { x: centerX, y: centerY, z: centerZ });
    // console.log("🔄 Door Rotation Angle:", { radians: angle, degrees: (angle * 180) / Math.PI });
    console.log('angle for door :',angle)

    const { scene } = useGLTF("/table/table_and_chairs.glb");

    scene.traverse((child) => {
        if (child.isMesh) {
            // Only apply texture if tablePath exists
            if (tablePath) {
                const texture = new THREE.TextureLoader().load(tablePath);

                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    color: 0xffffff,
                    roughness: 0.7,
                    metalness: 0.1,
                });
            } else {
                // Basic material with no texture when no table is selected
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xaaaaaa, // Gray color to indicate no texture
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