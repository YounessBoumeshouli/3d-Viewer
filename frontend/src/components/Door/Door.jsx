import React, { useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Door = ({ wallStart, wallEnd ,path }) => {

    const [doorPath, setDoorPath] = useState(null);
    useEffect(() => {
        if (path) {
            localStorage.setItem("door", path);
        } else {
            // Don't set to "null" string
            localStorage.removeItem("door");
        }
    }, [path]);
    // Function to load the door texture
    const loadDoorTexture = () => {
        const storedDoor = localStorage.getItem("door");
        if (storedDoor === null) {
            return;
        }
            let image = storedDoor.split("/");
            const localURL = `/textures/door/${image[2]}`;
            const backendURL = `http://127.0.0.1:8000/api/image/${image[1]}/${image[2]}`;

            // Check if the local file exists first
            const img = new Image();
            img.src = localURL;
            img.onload = () => {
                setDoorPath(localURL);
            };
            img.onerror = () => {

                // Fetch from backend and store locally
                fetch(backendURL)
                    .then((response) => {
                        if (!response.ok) throw new Error("Image not found on backend");
                        return response.blob();
                    })
                    .then((blob) => {
                        const objectURL = URL.createObjectURL(blob);
                        setDoorPath(objectURL); // Use object URL
                    })
                    .catch((error) => {
                        console.error("⚠️ Error downloading image:", error);
                    });
            };

    };

    // Initial load
    useEffect(() => {
        loadDoorTexture();

        // Add storage event listener
        const handleStorageChange = (event) => {
            if (event.key === "door") {
                loadDoorTexture();
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
            const customEvent = new Event("doorChanged");
            window.dispatchEvent(customEvent);
        };

        // Override the setItem method to dispatch our custom event
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === "door") {
                handleSameTabChange();
            }
        };

        // Listen for our custom event
        const handleDoorChanged = () => {
            loadDoorTexture();
        };
        window.addEventListener("doorChanged", handleDoorChanged);

        return () => {
            // Restore original setItem
            localStorage.setItem = originalSetItem;
            window.removeEventListener("doorChanged", handleDoorChanged);
        };
    }, []);

    if (!wallStart || !wallEnd) return null; // Ensure valid data

    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const centerZ = (startZ + endZ) / 2;

    const angle = Math.atan2(endY - startY, endX - startX);

    const { scene } = useGLTF("/door.glb");

    scene.traverse((child) => {
        if (child.isMesh) {
            // Only apply texture if doorPath exists
            if (doorPath) {
                const texture = new THREE.TextureLoader().load(doorPath);

                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    color: 0xffffff,
                    roughness: 0.7,
                    metalness: 0.1,
                });
            } else {
                // Basic material with no texture when no door is selected
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
            position={[centerX, 0, -centerY]}
            rotation={[0, angle, 0]}
            scale={[1, 1, 1]}
        />
    );
};

export default Door;