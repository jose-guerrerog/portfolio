"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
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
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { githubLink, linkedinLink } from "../constants";
import DeathStar from '../models/DeathStar'
import { Bird } from '../models/Bird'
import StormTrooper from '../models/StormTrooper'
import { TypeAnimation } from "react-type-animation";
// import {useSearchParams} from "next/navigation";

const socials: { icon: React.ReactNode; path: string }[] = [
  {
    icon: <FaGithub />,
    path: githubLink,
  },
  {
    icon: <FaLinkedinIn />,
    path: linkedinLink,
  },
];

const About2 = () => {
  // const searchParams = useSearchParams();
  // const version = searchParams.get('version');
  // const isOriginalVersion = version !== '1';

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    // if (window.innerWidth < 768) {
    //   screenScale = [0.9, 0.9, 0.9];
    //   screenPosition = [0, -6.5, -43.4];
    // } else {
      screenScale = [5, 5, 5];
      screenPosition = [0, -36.5, -43.4];
    //}

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <div>
      {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div> */}
      <Typography sx={{
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
      }}
      variant="h3">
        Welcome to my Site
      </Typography>
      <Canvas
        style={{
          height: '400px'
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

      <div className='absolute bottom-2 left-2'>
        {/* <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        /> */}
      </div>
    </div>
  );
};

export default About2;
