'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import * as THREE from "three";
import DeathStar from "../models/DeathStar";
import { Canvas, useThree } from "@react-three/fiber";

const ModelLoader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#4c82ed" wireframe />
    </mesh>
  );
};

const Scene = () => {
  const { gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [deathStarGroup, setDeathStarGroup] = useState<THREE.Group | null>(null);

  // Simple mouse interaction
  useEffect(() => {
    if (!gl || !deathStarGroup) return;
    
    const canvas = gl.domElement;
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setPreviousMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !deathStarGroup) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      // Apply rotation directly
      deathStarGroup.rotation.y += deltaMove.x * 0.01;
      deathStarGroup.rotation.x += deltaMove.y * 0.01;

      setPreviousMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setPreviousMousePosition({ x: touch.clientX, y: touch.clientY });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging || !deathStarGroup) return;
      
      const touch = e.touches[0];
      const deltaMove = {
        x: touch.clientX - previousMousePosition.x,
        y: touch.clientY - previousMousePosition.y
      };
      
      deathStarGroup.rotation.y += deltaMove.x * 0.01;
      deathStarGroup.rotation.x += deltaMove.y * 0.01;
      
      setPreviousMousePosition({ x: touch.clientX, y: touch.clientY });
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, isDragging, previousMousePosition, deathStarGroup]);

  const handleDeathStarLoad = (group: THREE.Group) => {
    setDeathStarGroup(group);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={0.4} />
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
      
      <Suspense fallback={<ModelLoader />}>
        <DeathStar 
          position={[0, 0, 0]} 
          scale={isMobile ? [0.04, 0.04, 0.04] : [0.06, 0.06, 0.06]}
          onLoad={handleDeathStarLoad}
        />
      </Suspense>
    </>
  );
};

export default function DeathStarCanvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Simple loading simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setCanvasReady(true);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  if (!canvasReady) {
    return (
      <div className="h-[400px] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="font-mono text-sm">Loading 3D Model...</div>
          <div className="w-48 bg-gray-700 rounded-full h-2 mt-3 mx-auto">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas 
      shadows
      style={{ width: '100%', height: '400px' }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}