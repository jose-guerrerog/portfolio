'use client';
import { useState, useEffect, Suspense } from 'react';
import * as THREE from "three";
import DeathStar from "../models/DeathStar";
import { Canvas, useThree } from "@react-three/fiber";

// Simple loading component
const ModelLoader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#4c82ed" wireframe />
    </mesh>
  );
};

const Scene = () => {
  const { gl, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [deathStarGroup, setDeathStarGroup] = useState<THREE.Group | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Set initial camera position
  useEffect(() => {
    // Let the camera start closer to see the Death Star better
    camera.position.set(0, 0, 8);
  }, [camera]);

  useEffect(() => {
    if (!gl || !deathStarGroup) return;
    
    // Mouse down event - start dragging
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setAutoRotate(false); // Temporarily disable auto-rotation during manual rotation
      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Mouse move event - rotate if dragging
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !deathStarGroup) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      // Update model rotation based on mouse movement
      deathStarGroup.rotation.y += deltaMove.x * 0.01;
      deathStarGroup.rotation.x += deltaMove.y * 0.01;

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Mouse up event - stop dragging
    const handleMouseUp = () => {
      setIsDragging(false);
      // Resume auto-rotation after 1 second
      setTimeout(() => setAutoRotate(true), 1000);
    };

    // Add event listeners to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setAutoRotate(false);
      setPreviousMousePosition({
        x: touch.clientX,
        y: touch.clientY
      });
    });
    
    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging || !deathStarGroup) return;
      
      const touch = e.touches[0];
      const deltaMove = {
        x: touch.clientX - previousMousePosition.x,
        y: touch.clientY - previousMousePosition.y
      };
      
      // Update the rotation
      deathStarGroup.rotation.y += deltaMove.x * 0.01;
      deathStarGroup.rotation.x += deltaMove.y * 0.01;
      
      setPreviousMousePosition({
        x: touch.clientX,
        y: touch.clientY
      });
    });
    
    canvas.addEventListener('touchend', () => {
      setIsDragging(false);
      // Resume auto-rotation after 1 second
      setTimeout(() => setAutoRotate(true), 1000);
    });

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleMouseDown as any);
      canvas.removeEventListener('touchmove', handleMouseMove as any);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [gl, isDragging, previousMousePosition, deathStarGroup]);

  // Handle getting reference to the Death Star group
  const handleDeathStarLoad = (group: THREE.Group) => {
    setDeathStarGroup(group);
  };

  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2}
        castShadow
      />
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.6}
        color="#8080ff"
      />
      
      {/* Death Star model */}
      <Suspense fallback={<ModelLoader />}>
        <DeathStar 
          position={[0, 0, 0]} 
          scale={[0.08, 0.08, 0.08]}
          isRotating={autoRotate}
          onLoad={handleDeathStarLoad}
        />
      </Suspense>
    </>
  );
};

export default function DeathStarCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} performance={{ min: 0.2 }} shadows={false} style={{ width: '100%', height: '600px' }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}