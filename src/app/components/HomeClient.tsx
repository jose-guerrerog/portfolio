"use client";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AudioControl from "./AudioControl";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/models/death_star-draco-2.glb");

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
    <>
      <div ref={containerRef} className="h-[400px]">
        {isVisible && <DeathStarCanvas />}
      </div>
      <div className="mt-6">
        <AudioControl />
      </div>
    </>
  );
}
