import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface DeathStarProps {
  position: [number, number, number];
  scale: [number, number, number];
  isRotating?: boolean;
  onLoad?: (group: THREE.Group) => void;
}

const DeathStar: React.FC<DeathStarProps> = ({ position, scale, isRotating, onLoad }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('./models/death_star-draco-2.glb');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (scene) {
      setIsReady(true);
    }
  }, [scene]);

  useEffect(() => {
    if (groupRef.current && onLoad) {
      onLoad(groupRef.current);
    }
  }, [onLoad, isReady]);

  // KEEP the auto-rotation - this works with OrbitControls
  useFrame(() => {
    if (isRotating && groupRef.current && isReady) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Chunked shadow setup
  useEffect(() => {
    if (!scene) return;
    
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
  
    const processBatch = (startIndex: number) => {
      const batchSize = 5;
      const endIndex = Math.min(startIndex + batchSize, meshes.length);
    
      for (let i = startIndex; i < endIndex; i++) {
        meshes[i].castShadow = true;
        meshes[i].receiveShadow = true;
      }
    
      if (endIndex < meshes.length) {
        requestAnimationFrame(() => processBatch(endIndex));
      }
    };
  
    requestAnimationFrame(() => processBatch(0));
  }, [scene]);

  if (!isReady) return null;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};
export default DeathStar;