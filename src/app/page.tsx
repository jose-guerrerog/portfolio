"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import StormTrooper from "./models/StormTrooper";
import Thanos from "./models/Thanos";
import Bart from "./models/Bart";
import Loader from "./components/Loader";

const Home = () => {
  const audioRef = useRef(
    typeof Audio !== "undefined" ? new Audio("/audio.mp3") : undefined
  );
  if (audioRef && audioRef.current) {
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

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
      {/* <Box
        component='div'
       sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: 'nowrap'
      }}
       > */}
      <Typography
        // sx={{
        //   color: "white",
        //   wordBreak: "break-word",
        //   textAlign: 'center',
        //   flexWrap: 'wrap'
        // }}
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
        variant="h3"
        fontStyle="italic"
      >
        Welcome to my Site
      </Typography>
      {/* </Box> */}
      <Canvas
      style={{
        width: '100%',
        height: '650px'
      }}
      >
        <Suspense fallback={<Loader />}>
          <StormTrooper
            position={[-2, -2, 1]}
            scale={[1, 1, 1]}
          />
          <Bart
            isRotating
            position={[2, -2, 1]}
            scale={[1, 1, 1]}
          />
          <Thanos
            isRotating
            position={[0, -2, -3]}
            scale={[0.016, 0.016, 0.016]}
          />
        </Suspense>
      </Canvas>

      <Box
        component="div"
        sx={{
          position: "absolute",
          right: "50px",
          top: "75px",
          cursor: "pointer",
        }}
      >
        {isPlayingMusic ? (
          <Volume2
            color="#ffffff"
            className="w-full h-full text-foreground group-hover:text-accent"
            strokeWidth={1.5}
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
