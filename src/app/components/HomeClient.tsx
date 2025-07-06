"use client";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { githubLink, linkedinLink } from "../constants";

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
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-xl text-white">Hello,</h2>
          <h1 className="text-5xl font-bold text-white">
            I&apos;m <span className="text-yellow-400">Jose</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            I am a skilled and passionate software developer with experience in
            creating interactive web applications.
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="/assets/Resume - Jose Guerrero.pdf"
              download
              className="px-6 py-2 rounded-full border border-[#00ff99] text-[#00ff99] font-medium hover:bg-[#00ff99] hover:text-black transition"
            >
              Download Resume
            </a>
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex gap-4 pt-6">
            <Link href={githubLink}>
              <Image
                src="/images/github-mark-white.svg"
                alt="Github Icon"
                width={35}
                height={35}
              />
            </Link>
            <Link href={linkedinLink}>
              <Image
                src="/images/linkedin-icon.svg"
                alt="Linkedin Icon"
                width={45}
                height={45}
              />
            </Link>
          </div>
        </div>

        {/* Avatar Section */}
        <div ref={containerRef} className="h-[400px]">
        {isVisible && <DeathStarCanvas />}
      </div>
      </div>
    </div>
  );
}
