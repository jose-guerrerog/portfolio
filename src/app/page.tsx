"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense } from "react";
// Properly import MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from 'next/dynamic';

// Simple loading component for model loading
const ModelLoader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#4c82ed" wireframe />
    </mesh>
  );
};

// Dynamically import your Death Star model
const DeathStar = dynamic(() => import("./models/DeathStar"), {
  loading: () => <ModelLoader />,
  ssr: false,
});

const Home = () => {
  const audioRef = useRef(
    typeof Audio !== "undefined" ? new Audio("/audio.mp3") : undefined
  );
  if (audioRef && audioRef.current) {
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Toggle music
  const toggle = () => {
    const newState = !isPlayingMusic;
    setIsPlayingMusic(!isPlayingMusic);
    if (newState) {
      audioRef && audioRef.current && audioRef.current.play();
    } else {
      audioRef && audioRef.current && audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (!(audioRef && audioRef.current)) {
      return;
    }

    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      if (!(audioRef && audioRef.current)) {
        return;
      }
      audioRef.current.pause();
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
      
      <Canvas
        style={{
          width: '100%',
          height: '650px'
        }}
      >
        {/* Brighter lighting for better visibility */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.0} 
          color="#ffffff" 
        />
        
        {/* Add a subtle highlight from another angle */}
        <directionalLight 
          position={[-5, 3, 2]} 
          intensity={0.3} 
          color="#aaaaff" 
        />
        
        {/* Your Death Star model with improved color */}
        <DeathStar
          position={[0, 0, 0]} 
          scale={[0.05, 0.05, 0.05]}
          isRotating={true} 
        />
      </Canvas>

      {/* <Box
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
      </Box> */}
    </Box>
  );
};

export default Home;