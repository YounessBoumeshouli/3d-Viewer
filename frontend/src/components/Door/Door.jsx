import React, { useEffect, useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Door = ({ wallStart, wallEnd, path }) => {
    const [texture, setTexture] = useState(null);
    const [textureLoaded, setTextureLoaded] = useState(false);
    const { scene } = useGLTF("/door.glb");

    useEffect(() => {
        const loadTexture = async () => {
            if (!path) {
                setTexture(null);
                setTextureLoaded(false);
                return;
            }

            try {
                const parts = path.split("/");
                const localPath = `/textures/door/${parts[2]}`;
                const backendUrl = `http://127.0.0.1:8000/api/image/door/${parts[2]}`;

                try {
                    const tex = await new THREE.TextureLoader().loadAsync(localPath);
                    tex.encoding = THREE.sRGBEncoding;
                    setTexture(tex);
                    setTextureLoaded(true);
                } catch (localError) {
                    console.log("Local load failed, trying backend");
                    const response = await fetch(backendUrl);
                    if (!response.ok) throw new Error("Backend load failed");
                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    const tex = await new THREE.TextureLoader().loadAsync(objectUrl);
                    tex.encoding = THREE.sRGBEncoding;
                    setTexture(tex);
                    setTextureLoaded(true);
                }
            } catch (error) {
                console.error("Texture loading failed:", error);
                setTexture(null);
                setTextureLoaded(false);
            }
        };

        loadTexture();
    }, [path]);

    // Create optimized scene clone with proper materials
    const sceneClone = useMemo(() => {
        if (!scene) return null;

        const clone = scene.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                // Always create a NEW material instance
                child.material = new THREE.MeshStandardMaterial({
                    map: texture || null,
                    color: texture ? 0xffffff : 0xaaaaaa,
                    roughness: 0.7,
                    metalness: 0.1
                });

                // Force updates
                child.material.needsUpdate = true;
                if (texture) texture.needsUpdate = true;

                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return clone;
    }, [scene, texture]); // Recreate when texture changes

    if (!wallStart || !wallEnd) return null;

    // Position calculations (unchanged)
    const [startX, startY, startZ] = wallStart;
    const [endX, endY, endZ] = wallEnd;
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const angle = Math.atan2(endY - startY, endX - startX);

    return (
        <primitive
            object={sceneClone}
            position={[centerX, 0, -centerY]}
            rotation={[0, angle, 0]}
            scale={[1, 1, 1]}
        />
    );
};

export default Door;