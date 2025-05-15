"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function DeathStar(props) {
  const groupRef = useRef();
  
  // Slow rotation effect if enabled
  useFrame(() => {
    if (props.isRotating && groupRef.current) {
      // Very slow rotation for the Death Star
      groupRef.current.rotation.y += 0.0005;
    }
  });

  // Use GLTF model - make sure the path matches your actual model file
  const { scene } = useGLTF('./models/death_star_2.glb');
  
  // We won't modify the materials since the model should already have the correct appearance
  // Just make sure we enable shadows for better rendering
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={groupRef} position={props.position} scale={props.scale}>
      {/* Just render the model with its original materials */}
      <primitive object={scene} />
    </group>
  );
}

export default DeathStar;