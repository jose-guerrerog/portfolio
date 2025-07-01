import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface DeathStarProps {
  position: [number, number, number];
  scale: [number, number, number];
  onLoad?: (group: THREE.Group, worker: Worker, setDragging: (dragging: boolean) => void, getRotation: () => void) => void;
  syncedRotation?: { x: number; y: number; z: number };
}

const DeathStar: React.FC<DeathStarProps> = ({ position, scale, onLoad, syncedRotation }) => {
  const groupRef = useRef<THREE.Group>(null);
  const workerRef = useRef<Worker | null>(null);
  const { scene } = useGLTF("./models/death_star-draco-2.glb");

  const [isReady, setIsReady] = useState(false);
  const [workerRotation, setWorkerRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const worker = new Worker("/workers/model-worker.js");

    worker.onmessage = (e) => {
      const { type, data } = e.data;

      switch (type) {
        case "WORKER_READY":
          worker.postMessage({ type: "INIT_MODEL" });
          break;
        case "MODEL_INITIALIZED":
          worker.postMessage({ type: "START_ANIMATION" });
          break;
        case "ANIMATION_FRAME":
          setWorkerRotation(data.rotation);
          break;
      }
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error);
    };

    workerRef.current = worker;

    return () => {
      worker.postMessage({ type: "STOP_ANIMATION" });
      worker.terminate();
    };
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

  useEffect(() => {
    if (groupRef.current && isReady && onLoad) {
      onLoad(
        groupRef.current,
        workerRef.current!,
        setIsDragging,
        () => {
          if (groupRef.current) {
            const r = groupRef.current.rotation;
            setWorkerRotation({ x: r.x, y: r.y, z: r.z }); // <- important to keep continuity
          }
        }
      );
    }
  }, [onLoad, isReady]);

  useEffect(() => {
    workerRef.current?.postMessage({ type: "SET_DRAGGING", data: { isDragging } });
  }, [isDragging]);

  useFrame(() => {
    if (!groupRef.current || !isReady) return;
    if (!isDragging) {
      groupRef.current.rotation.set(
        workerRotation.x,
        workerRotation.y,
        workerRotation.z
      );
    }
  });

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
