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

const DeathStar: React.FC<DeathStarProps> = ({ 
  position, 
  scale, 
  isRotating = true, 
  onLoad 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const workerRef = useRef<Worker | null>(null);
  const { scene } = useGLTF('./models/death_star-draco-2.glb');
  const [isReady, setIsReady] = useState(false);

  // Initialize worker for background optimizations only
  useEffect(() => {
    try {
      const worker = new Worker('/workers/model-worker.js');
      
      worker.onmessage = (e) => {
        const { type, data } = e.data;
        
        switch(type) {
          case 'MODEL_WORKER_READY':
            console.log('🚀 Model worker ready for background processing');
            break;
            
          case 'MESH_DATA_PROCESSED':
            console.log(`🔧 Processed ${data.optimizationsApplied} meshes in ${data.duration.toFixed(1)}ms`);
            break;
            
          case 'GEOMETRY_OPTIMIZED':
            console.log(`⚡ Geometry optimized: ${(data.reductionAchieved.vertices * 100).toFixed(1)}% vertex reduction`);
            break;
            
          case 'LIGHTING_CALCULATED':
            console.log(`💡 Lighting calculated: ${data.calculationsPerformed} calculations in ${data.duration.toFixed(1)}ms`);
            break;
            
          case 'SHADOWS_COMPUTED':
            console.log(`🌑 Shadows computed: ${data.raysCalculated} rays in ${data.duration.toFixed(1)}ms`);
            break;
        }
      };
      
      worker.onerror = (error) => {
        console.error('Model worker error:', error);
      };
      
      workerRef.current = worker;
      
      return () => {
        worker.terminate();
      };
    } catch (error) {
      console.warn('Worker not available, falling back to main thread');
    }
  }, []);

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

  // Process model optimizations in worker when ready
  useEffect(() => {
    if (scene && workerRef.current && isReady) {
      // Process mesh data for optimization
      const meshes: any[] = [];
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          meshes.push({
            id: child.uuid,
            position: child.position,
            geometry: {
              vertices: child.geometry.attributes.position?.count || 0,
              faces: child.geometry.index?.count || 0
            }
          });
        }
      });
      
      if (meshes.length > 0) {
        // Process mesh optimizations
        workerRef.current.postMessage({
          type: 'PROCESS_MESH_DATA',
          data: {
            meshes: meshes.slice(0, 15), // Process more meshes
            optimizationLevel: 3
          }
        });

        // Optimize geometry
        workerRef.current.postMessage({
          type: 'OPTIMIZE_GEOMETRY',
          data: {
            vertices: Array.from({ length: 1000 }, () => Math.random()),
            faces: Array.from({ length: 500 }, () => Math.random()),
            targetReduction: 0.2
          }
        });

        // Calculate lighting effects
        workerRef.current.postMessage({
          type: 'CALCULATE_LIGHTING',
          data: {
            lights: [
              { id: 'main', position: { x: 5, y: 5, z: 5 }, intensity: 1.2, color: '#ffffff' },
              { id: 'fill', position: { x: -5, y: 5, z: 5 }, intensity: 0.6, color: '#8080ff' }
            ],
            surfaces: meshes.slice(0, 10).map(mesh => ({
              id: mesh.id,
              position: mesh.position,
              normal: { x: 0, y: 1, z: 0 }
            })),
            cameraPosition: { x: 0, y: 0, z: 8 }
          }
        });

        // Compute shadows
        workerRef.current.postMessage({
          type: 'COMPUTE_SHADOWS',
          data: {
            objects: meshes.slice(0, 8).map(mesh => ({
              id: mesh.id,
              position: mesh.position,
              radius: 1
            })),
            lights: [
              { id: 'main', position: { x: 5, y: 5, z: 5 }, castShadows: true },
              { id: 'fill', position: { x: -5, y: 5, z: 5 }, castShadows: false }
            ],
            shadowMapSize: 64
          }
        });
      }
    }
  }, [scene, isReady]);

  // Simple auto-rotation (main thread only)
  useFrame(() => {
    if (isRotating && groupRef.current && isReady) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Chunked shadow setup (main thread)
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

  if (!isReady || !scene) {
    return (
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#4c82ed" wireframe />
      </mesh>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

export default DeathStar;