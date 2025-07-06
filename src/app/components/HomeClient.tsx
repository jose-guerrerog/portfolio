"use client";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AudioControl from "./AudioControl";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

useGLTF.preload("/models/death-star-draco.glb");

const DeathStarCanvas = dynamic(() => import("./DeathStarCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] text-center text-white flex items-center justify-center">
      Loading 3D...
    </div>
  ),
});

export default function HomeClient() {
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
    <div className="w-full relative px-4">
      <div className="w-full max-w-4xl mx-auto text-center pt-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold italic mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-shine drop-shadow-md tracking-tight"
        >
          Welcome to my Site
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sky-200 text-lg md:text-xl font-medium mb-12 tracking-wide drop-shadow-sm"
        >
          Click and drag to rotate the Death Star
        </motion.p>
      </div>
      <div ref={containerRef} className="h-[400px]">
        {isVisible && <DeathStarCanvas />}
      </div>
      <div className="mt-6">
        <AudioControl />
      </div>
    </div>
  );
}
