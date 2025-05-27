"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from 'next/dynamic';

const DeathStarCanvas = dynamic(() => import('./components/DeathStarCanvas'), {
  ssr: false,
  loading: () => <div style={{ height: 600, textAlign: 'center' }}>Loading 3D...</div>
});

// Scene component with rotation logic


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
      
      {/* <Canvas
        style={{
          width: '100%',
          height: '600px'
        }}
      >
        <Scene />
      </Canvas> */}
      <DeathStarCanvas />

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