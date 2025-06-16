"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AudioControl from "./components/AudioControl";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("./models/death_star-draco-2.glb");

const DeathStarCanvas = dynamic(() => import("./components/DeathStarCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] text-center text-white">Loading 3D...</div>
  ),
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), 100);
        observer.disconnect();
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full relative">
      <h1
        className="text-center text-3xl md:text-5xl font-bold italic mb-2 bg-gradient-to-r from-red-400 via-blue-500 to-red-400 bg-[length:200%_auto] text-transparent bg-clip-text animate-shine z-10 relative"
      >
        Welcome to my Site
      </h1>

      <p className="text-center text-[#a3e4ff] text-base font-medium mb-2 tracking-wide drop-shadow-md animate-pulse">
        Click and drag to rotate the Death Star
      </p>
      <div ref={containerRef} className="h-[600px]">
        {isVisible && <DeathStarCanvas />}
      </div>

      <AudioControl />
    </div>
  );
}
