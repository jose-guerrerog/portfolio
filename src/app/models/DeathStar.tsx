// src/app/models/DeathStar.tsx
"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Define the prop types
interface DeathStarProps {
  position: [number, number, number];
  scale: [number, number, number];
  isRotating?: boolean;
  onLoad?: (group: THREE.Group) => void;
}

// Create a simple component without ref forwarding
const DeathStar: React.FC<DeathStarProps> = ({ position, scale, isRotating, onLoad }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('./models/death_star_2.glb');
  
  // Call onLoad when the group is available
  React.useEffect(() => {
    if (groupRef.current && onLoad) {
      onLoad(groupRef.current);
    }
  }, [onLoad]);
  
  // Auto-rotation if enabled
  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });
  
  // Enable shadows
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

export default DeathStar;