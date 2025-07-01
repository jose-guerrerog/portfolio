import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface DeathStarProps {
  position: [number, number, number];
  scale: [number, number, number];
  onLoad?: (group: THREE.Group) => void;
}

const DeathStar: React.FC<DeathStarProps> = ({ 
  position, 
  scale, 
  onLoad 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const workerRef = useRef<Worker | null>(null);
  const { scene } = useGLTF('./models/death_star-draco-2.glb');
  
  const [isReady, setIsReady] = useState(false);
  const [workerRotation, setWorkerRotation] = useState({ x: 0, y: 0, z: 0 });
  const [useWorker, setUseWorker] = useState(true);

  useEffect(() => {
    try {
      const worker = new Worker('/workers/model-worker.js');
      
      worker.onmessage = (e) => {
        const { type, data } = e.data;
        
        switch(type) {
          case 'WORKER_READY':
            console.log('Animation worker ready');
            // Initialize the model
            worker.postMessage({ type: 'INIT_MODEL' });
            break;
            
          case 'MODEL_INITIALIZED':
            console.log('Model initialized in worker');
            worker.postMessage({ type: 'START_ANIMATION' });
            break;
            
          case 'ANIMATION_FRAME':
            // Update rotation from worker
            setWorkerRotation(data.rotation);
            break;
        }
      };
      
      worker.onerror = (error) => {
        console.error('Worker error:', error);
        setUseWorker(false);
      };
      
      workerRef.current = worker;
      
      return () => {
        if (worker) {
          worker.postMessage({ type: 'STOP_ANIMATION' });
          worker.terminate();
        }
      };
    } catch (error) {
      console.warn('Worker not available, falling back to main thread');
      setUseWorker(false);
    }
  }, []);

  useEffect(() => {
    if (scene) {
      setIsReady(true);
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Call onLoad when ready
  useEffect(() => {
    if (groupRef.current && onLoad && isReady) {
      onLoad(groupRef.current);
    }
  }, [onLoad, isReady]);

  useFrame((state, delta) => {
    if (groupRef.current && isReady) {
      if (useWorker && workerRef.current) {
        groupRef.current.rotation.x = workerRotation.x;
        groupRef.current.rotation.y = workerRotation.y;
        groupRef.current.rotation.z = workerRotation.z;
      } else {
        groupRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  // Loading fallback
  if (!isReady || !scene) {
    return (
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
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