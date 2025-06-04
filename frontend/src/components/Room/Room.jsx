import React, { Suspense, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { DxfParser } from 'dxf-parser';
import { useTexture } from '@react-three/drei';
import Loader from '../components/Loader';
import api from "../services/api.js";
const Room = ({wallH}) => {
    const extrudeSettings = {
        steps: 1,
        depth: wallH * 4,
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Update UVs for proper texture mapping based on wall dimensions
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);

    geometry.attributes.uv.needsUpdate = true;
}
export default Room;