"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
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

// Dynamically import models with custom loading states
const StormTrooper = dynamic(() => import("./models/StormTrooper"), {
  loading: () => <ModelLoader />,
  ssr: false,
});

// Commented out other models
/*
const Bart = dynamic(() => import("./models/Bart"), {
  loading: () => <ModelLoader />,
  ssr: false,
});

const Thanos = dynamic(() => import("./models/Thanos"), {
  loading: () => <ModelLoader />,
  ssr: false,
});
*/

const Home = () => {
  const audioRef = useRef(
    typeof Audio !== "undefined" ? new Audio("/audio.mp3") : undefined
  );
  if (audioRef && audioRef.current) {
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [visibleModels, setVisibleModels] = useState({
    stormTrooper: false,
    // Keeping these in state but not using them
    // bart: false,
    // thanos: false
  });

  // Load only the StormTrooper model
  useEffect(() => {
    // Start loading the StormTrooper model immediately
    setVisibleModels(prev => ({ ...prev, stormTrooper: true }));
    
    /* Commented out loading of other models
    // Load second model after 500ms
    const timer1 = setTimeout(() => {
      setVisibleModels(prev => ({ ...prev, bart: true }));
    }, 500);
    
    // Load third model after 1000ms
    const timer2 = setTimeout(() => {
      setVisibleModels(prev => ({ ...prev, thanos: true }));
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
    */
  }, []);

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
    <Box component='div' sx={{ width: '100%'}}>
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
        {/* Common lighting and environment that all models need */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {visibleModels.stormTrooper && (
          <StormTrooper
            position={[0, -2, 0]} 
            scale={[1.2, 1.2, 1.2]}
            isRotating={true} 
          />
        )}
        
        {/* Commented out other models
        {visibleModels.bart && (
          <Bart
            isRotating
            position={[2, -2, 1]}
            scale={[1, 1, 1]}
          />
        )}
        
        {visibleModels.thanos && (
          <Thanos
            isRotating
            position={[0, -2, -3]}
            scale={[0.016, 0.016, 0.016]}
          />
        )}
        */}
      </Canvas>

      <Box
        component="div"
        sx={{
          position: "absolute",
          right: "50px",
          top: "60px",
          cursor: "pointer",
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