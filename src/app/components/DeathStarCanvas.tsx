'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import * as THREE from 'three';
import DeathStar from '../models/DeathStar';
import { Canvas, useThree } from '@react-three/fiber';

const ModelLoader = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshStandardMaterial color="#4c82ed" wireframe />
  </mesh>
);

const Scene = () => {
  const { gl } = useThree();
  const [deathStarGroup, setDeathStarGroup] = useState<THREE.Group | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const setDraggingRef = useRef<(dragging: boolean) => void>();
  const syncRotationRef = useRef<() => void>();

  useEffect(() => {
    if (!gl || !deathStarGroup || !setDraggingRef.current) return;

    const canvas = gl.domElement;
    const previousMouse = { x: 0, y: 0 };
    let isDragging = false;
    let lastDelta = { x: 0, y: 0 };

    const endDrag = () => {
      isDragging = false;
      setDraggingRef.current?.(false);
      workerRef.current?.postMessage({ type: 'SET_DRAGGING', data: { isDragging: false } });

      if (deathStarGroup) {
        const r = deathStarGroup.rotation;

        syncRotationRef.current?.();

        workerRef.current?.postMessage({
          type: 'UPDATE_ROTATION',
          data: { x: r.x, y: r.y, z: r.z }
        });

        const velocity = {
          x: lastDelta.y * 0.003,
          y: lastDelta.x * 0.003,
          z: 0
        };

        workerRef.current?.postMessage({
          type: 'APPLY_INERTIA',
          data: { velocity }
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setDraggingRef.current?.(true);
      workerRef.current?.postMessage({ type: 'SET_DRAGGING', data: { isDragging: true } });
      previousMouse.x = e.clientX;
      previousMouse.y = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !deathStarGroup) return;
      const dx = e.clientX - previousMouse.x;
      const dy = e.clientY - previousMouse.y;
      deathStarGroup.rotation.y += dx * 0.003;
      deathStarGroup.rotation.x += dy * 0.003;
      lastDelta = { x: dx, y: dy };
      previousMouse.x = e.clientX;
      previousMouse.y = e.clientY;
    };

    const handleMouseUp = () => endDrag();
    const handleMouseLeave = () => {
      if (isDragging) endDrag();
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDragging = true;
      setDraggingRef.current?.(true);
      workerRef.current?.postMessage({ type: 'SET_DRAGGING', data: { isDragging: true } });
      previousMouse.x = touch.clientX;
      previousMouse.y = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !deathStarGroup) return;
      const touch = e.touches[0];
      const dx = touch.clientX - previousMouse.x;
      const dy = touch.clientY - previousMouse.y;
      deathStarGroup.rotation.y += dx * 0.003;
      deathStarGroup.rotation.x += dy * 0.003;
      lastDelta = { x: dx, y: dy };
      previousMouse.x = touch.clientX;
      previousMouse.y = touch.clientY;
    };

    const handleTouchEnd = () => endDrag();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, deathStarGroup]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.6} color="#8080ff" />
      <Suspense fallback={<ModelLoader />}>
        <DeathStar
          position={[0, 0, 0]}
          scale={[0.06, 0.06, 0.06]}
          onLoad={(group, worker, setDragging, syncRotation) => {
            setDeathStarGroup(group);
            workerRef.current = worker;
            setDraggingRef.current = setDragging;
            syncRotationRef.current = syncRotation;
          }}
        />
      </Suspense>
    </>
  );
};

export default function DeathStarCanvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
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
          <div className="text-xs text-gray-400 mt-2">{Math.round(loadingProgress)}%</div>
        </div>
      </div>
    );
  }

  return (
    <Canvas shadows style={{ width: '100%', height: '400px' }} camera={{ position: [0, 0, 8], fov: 50 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
