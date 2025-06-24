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
  const [workerStats, setWorkerStats] = useState({
    active: false,
    meshesProcessed: 0,
    optimizationLevel: 0
  });
  
  // Set initial camera position with smooth transition
  useEffect(() => {
    camera.position.set(0, 0, 8);
    
    // Smooth camera animation
    const startPos = camera.position.clone();
    const targetPos = new THREE.Vector3(0, 0, 8);
    const startTime = Date.now();
    const duration = 1000;
    
    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      camera.position.lerpVectors(startPos, targetPos, eased);
      
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };
    
    animateCamera();
  }, [camera]);

  // Enhanced mouse/touch interaction
  useEffect(() => {
    if (!gl || !deathStarGroup) return;
    
    const canvas = gl.domElement;
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setAutoRotate(false);
      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !deathStarGroup) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      // Apply rotation directly for immediate feedback
      deathStarGroup.rotation.y += deltaMove.x * 0.01;
      deathStarGroup.rotation.x += deltaMove.y * 0.01;

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => setAutoRotate(true), 1000);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setAutoRotate(false);
      setPreviousMousePosition({
        x: touch.clientX,
        y: touch.clientY
      });
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
      
      setPreviousMousePosition({
        x: touch.clientX,
        y: touch.clientY
      });
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      setTimeout(() => setAutoRotate(true), 1000);
    };

    // Add event listeners
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

  // Handle Death Star group reference
  const handleDeathStarLoad = (group: THREE.Group) => {
    setDeathStarGroup(group);
    
    // Update worker stats when model loads
    setWorkerStats(prev => ({
      ...prev,
      active: true,
      optimizationLevel: 2
    }));
  };

  // Monitor performance and adjust quality
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Auto-adjust quality based on performance
        if (fps < 30) {
          setWorkerStats(prev => ({
            ...prev,
            optimizationLevel: Math.max(0, prev.optimizationLevel - 1)
          }));
        } else if (fps > 50) {
          setWorkerStats(prev => ({
            ...prev,
            optimizationLevel: Math.min(3, prev.optimizationLevel + 1)
          }));
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    requestAnimationFrame(checkPerformance);
  }, []);

  return (
    <>
      {/* Enhanced lighting setup with worker-optimized shadows */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2}
        castShadow={workerStats.optimizationLevel > 1}
        shadow-mapSize-width={workerStats.optimizationLevel > 2 ? 2048 : 1024}
        shadow-mapSize-height={workerStats.optimizationLevel > 2 ? 2048 : 1024}
      />
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.6}
        color="#8080ff"
        castShadow={workerStats.optimizationLevel > 2}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow={workerStats.optimizationLevel > 1}
      />
      
      {/* Death Star model with worker optimization */}
      <Suspense fallback={<ModelLoader />}>
        <DeathStar 
          position={[0, 0, 0]} 
          scale={[0.06, 0.06, 0.06]}
          isRotating={autoRotate}
          onLoad={handleDeathStarLoad}
        />
      </Suspense>
    </>
  );
};

export default function DeathStarCanvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Simulate loading progress
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
      <div className="h-[600px] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="font-mono text-sm">
            Loading 3D Model with Workers...
          </div>
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
      dpr={[1, 2]} 
      performance={{ min: 0.5 }} 
      shadows={true}
      style={{ 
        width: '100%', 
        height: '600px'
      }}
      camera={{ 
        position: [0, 0, 8],
        fov: 50,
        near: 0.1,
        far: 1000
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}