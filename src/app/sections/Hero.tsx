"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import dynamic from "next/dynamic";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { useActiveSection } from "@/app/contexts/ActiveSectionContext";


useGLTF.preload("/models/death-star-draco.glb");

const DeathStarCanvas = dynamic(() => import("../components/DeathStarCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] text-center text-white flex items-center justify-center">
      Loading 3D...
    </div>
  ),
});

export default function Hero() {
  const { ref: heroRef, inView } = useInView({ threshold: 0.5 });
  const { setActiveSection } = useActiveSection();

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (inView) setActiveSection("home");
  }, [inView]);

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
    <section ref={heroRef} id="hero" className="w-full relative py-16 px-4 lg:px-0 scroll-mt-16">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <motion.h2 className="text-xl text-white">Hello,</motion.h2>
          <motion.h1 className="text-5xl font-bold text-white">
            I&apos;m <span className="text-yellow-400">Jose</span>
          </motion.h1>
          <motion.p className="text-lg text-gray-300 leading-relaxed">
            I am a skilled and passionate software developer with experience in
            creating interactive web applications.
          </motion.p>

          <div className="flex gap-4 pt-4 justify-center lg:justify-start">
            <a
              href="/assets/Resume - Jose Guerrero.pdf"
              download
              className="px-6 py-2 rounded-full border border-[#00ff99] text-[#00ff99] font-medium hover:bg-[#00ff99] hover:text-black transition"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6 mt-10 lg:mt-0"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sky-200 text-lg md:text-xl font-medium tracking-wide drop-shadow-sm text-center"
          >
            Click and drag to rotate the Death Star
          </motion.p>
          <div ref={containerRef} className="h-[400px]">
            {isVisible && <DeathStarCanvas />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
