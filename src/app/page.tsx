// src/app/page.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as THREE from "three";
import DeathStar from "./models/DeathStar";

// Simple loading component
const ModelLoader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#4c82ed" wireframe />
    </mesh>
  );
};

// Scene component with rotation logic
const Scene = () => {
  const { gl, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [deathStarGroup, setDeathStarGroup] = useState<THREE.Group | null>(null);
  
  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  useEffect(() => {
    if (!gl || !deathStarGroup) return;
    
    // Mouse down event - start dragging
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
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
    };

    // Add event listeners to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [gl, isDragging, previousMousePosition, deathStarGroup]);

  // Handle getting reference to the Death Star group
  const handleDeathStarLoad = (group: THREE.Group) => {
    setDeathStarGroup(group);
  };

  return (
    <>
      {/* Basic lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Death Star model */}
      <Suspense fallback={<ModelLoader />}>
        <DeathStar 
          position={[0, 0, 0]} 
          scale={[0.05, 0.05, 0.05]}
          isRotating={false}
          onLoad={handleDeathStarLoad}
        />
      </Suspense>
    </>
  );
};

const Home = () => {
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/audio.mp3") : undefined
  );
  if (audioRef.current) {
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Toggle music
  const toggle = () => {
    const newState = !isPlayingMusic;
    setIsPlayingMusic(newState);
    if (newState) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [isPlayingMusic]);

  return (
    <Box component='div' sx={{ width: '100%', position: 'relative' }}>
      <Typography
        textAlign={'center'}
        sx={{
          background: "linear-gradient(to left, #4c82ed, #FF6767 )",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          "@keyframes shine": {
            from: {
              WebkitFilter: "hue-rotate(0deg)",
            },
            to: {
              WebkitFilter: "hue-rotate(-360deg)",
            },
          },
          animation: `shine 5s linear infinite`,
        }}
        variant="h2"
        fontStyle="italic"
      >
        Welcome to my Site
      </Typography>
      
      <div style={{ 
        textAlign: 'center', 
        color: 'white', 
        marginBottom: '10px',
        fontSize: '14px'
      }}>
        Click and drag to rotate the Death Star
      </div>
      
      <Canvas
        style={{
          width: '100%',
          height: '600px'
        }}
      >
        <Scene />
      </Canvas>

      <Box
        component="div"
        sx={{
          position: "absolute",
          right: "50px",
          top: "60px",
          cursor: "pointer",
          zIndex: 100
        }}
      >
        {isPlayingMusic ? (
          <Volume2
            color="#ffffff"
            className="w-full h-full text-foreground group-hover:text-accent"
            strokeWidth={1.5}
            size={55}
            style={{
              padding: "1px",
            }}
            onClick={toggle}
          />
        ) : (
          <VolumeX
            color="#ffffff"
            className="w-full h-full text-foreground group-hover:text-accent"
            strokeWidth={1.5}
            size={55}
            style={{
              padding: "1px",
            }}
            onClick={toggle}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;