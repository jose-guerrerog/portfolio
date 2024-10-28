"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import StormTrooper from "../models/StormTrooper";

const About2 = () => {
  const audioRef = useRef(
    typeof Audio !== "undefined" ? new Audio("/audio.mp3") : undefined
  );
  if (audioRef && audioRef.current) {
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // const searchParams = useSearchParams();
  // const version = searchParams.get('version');
  // const isOriginalVersion = version !== '1';

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
    <div>
      {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div> */}
      <Typography
        noWrap
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
        variant="h3"
      >
        Welcome to my Site
      </Typography>
      <Canvas
        style={{
          height: "400px",
        }}
        // className={`w-full h-full bg-transparent`}
        // camera={{ near: 0.1, far: 20 }}
      >
        <Suspense fallback={<>loading</>}>
          {/* <DeathStar
           isRotating={true}
            position={islandPosition}
            scale={islandScale}
          /> */}
          <StormTrooper
            isRotating
            position={[0, -2.2, 1]}
            scale={[1.25, 1.25, 1.25]}
          />
        </Suspense>
      </Canvas>

      <Box
        component="div"
        sx={{
          position: "absolute",
          right: '50px',
          top: "75px",
          cursor: 'pointer'
        }}
      >
        {isPlayingMusic ? (
            <Volume2
              color="#ffffff"
              className="w-full h-full text-foreground group-hover:text-accent"
              strokeWidth={1.5}
              style={{
                padding: '1px',
              }}
              onClick={toggle}
            />
          ) : (
            <VolumeX
              color="#ffffff"
              className="w-full h-full text-foreground group-hover:text-accent"
              strokeWidth={1.5}
              style={{
                padding: '1px'
              }}
              onClick={toggle}
            />
          )}
      </Box>
    </div>
  );
};

export default About2;
