"use client";
import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from 'next/dynamic';
import AudioControl from './components/AudioControl';

import { useGLTF } from '@react-three/drei';
useGLTF.preload('./models/death_star-draco-2.glb');

const DeathStarCanvas = dynamic(() => import('./components/DeathStarCanvas'), {
  ssr: false,
  loading: () => <div style={{ height: 600, textAlign: 'center' }}>Loading 3D...</div>
});

// Scene component with rotation logic


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
        observer.disconnect();
      }
    });
  
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  });

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
      <div ref={containerRef} style={{ height: '600px' }}>
        {isVisible && <DeathStarCanvas />}
      </div>
      {/* <DeathStarCanvas /> */}
      <AudioControl />
    </Box>
  );
};

export default Home;