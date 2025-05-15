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
          background: "linear-gradient(to right, #FF6767, #4c82ed, #FF6767)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          "@keyframes shine": {
            "0%": {
              backgroundPosition: "0% center",
            },
            "100%": {
              backgroundPosition: "200% center",
            },
          },
          animation: `shine 5s linear infinite`,
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          mb: 1,
          position: 'relative',
          zIndex: 10
        }}
        variant="h2"
        fontStyle="italic"
      >
        Welcome to my Site
      </Typography>
      
      <div style={{ 
        textAlign: 'center', 
        color: '#a3e4ff', 
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: '500',
        letterSpacing: '1px',
        textShadow: '0 0 5px rgba(163, 228, 255, 0.7)',
        animation: 'pulse 2s infinite ease-in-out'
      }}>
        Click and drag to rotate the Death Star
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
      
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