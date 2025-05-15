// src/app/models/DeathStar.jsx
"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function DeathStar(props) {
  const groupRef = useRef();
  
  // Slow rotation effect
  useFrame(() => {
    if (props.isRotating && groupRef.current) {
      // Very slow rotation for the Death Star
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Use GLTF model - make sure the path matches your actual model file
  const { scene } = useGLTF('./models/death_star_2.glb');
  
  // Apply movie-accurate material that's much more visible
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Realistic Death Star material as seen in the films
          // Much lighter with defined surface
          const deathStarMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#777777'), // Light gray like in clear movie shots
            roughness: 0.55,
            metalness: 0.8,   // More metallic for better reflections
            emissive: new THREE.Color('#333333'),
            emissiveIntensity: 0.15,
          });
          
          // Check if this mesh is likely part of the superlaser dish
          // by analyzing its position (typically on top)
          const isSuperlaser = child.position.y > 0 || 
                              (child.position.y === 0 && 
                               child.geometry && 
                               child.geometry.boundingSphere && 
                               child.geometry.boundingSphere.center.y > 0);
          
          // Create a slightly darker material for the superlaser dish
          if (isSuperlaser) {
            deathStarMaterial.color = new THREE.Color('#666666');
            deathStarMaterial.metalness = 0.85;
          }
          
          // Apply the material
          child.material = deathStarMaterial;
          
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={groupRef} position={props.position} scale={props.scale}>
      {/* Just the model, nothing else */}
      <primitive object={scene} />
    </group>
  );
}

export default DeathStar;