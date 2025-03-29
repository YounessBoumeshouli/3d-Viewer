import React, {useEffect, useState,Suspense} from "react";
import { Canvas } from '@react-three/fiber';
import {AxesHelper,GridHelper} from 'three'
import Sky from "../models/Sky.jsx";
import {Loader, OrbitControls, Sparkles} from "@react-three/drei";
import DXFModel from '../models/DFXModel.jsx'
function House() {
    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, 0, 0];
        let rotation = [0.1, 4.7, 0];
        if (window.innerWidth <= 768) {
            screenScale =[0.9,0.9,0.9];
        } else  {
            screenScale = [1,1,1];
        }
        return [screenScale,screenPosition , rotation];
    }
    const [islandScale, islandPosition,rotation] = adjustIslandForScreenSize();

    return (
            <Canvas className='w-full h-sreen bg-transparent' camera={{near:0.1,far:1000}}>
                <primitive object={new AxesHelper(100)} />
                <primitive object={new GridHelper(100,10)} />
                <Suspense fallback={<Loader/>}>
                    <directionalLight position={[1, 1, 1]} intensity={2}/>
                    <OrbitControls enableZoom enablePan  enableRotate />
                    <ambientLight intensity={0.5}/>
                    <DXFModel
                    />

                    <hemisphereLight skyColor='#b1e1ff' groundColor={'#000000'} intensity={1}/>
                    <Sky/>

                </Suspense>
            </Canvas>
    )
}

export default House;