"use client";

import { motion } from "framer-motion";
import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";
import { projectAnimations } from "@/lib/animations";

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="w-full py-20 px-4 scroll-mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={projectAnimations.container}
    >
      <motion.div 
        className="text-center mb-16 relative"
        variants={projectAnimations.title}
      >
        <motion.h2
          className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4 tracking-tight leading-none"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          Projects
        </motion.h2>
      </motion.div>

      {/* Enhanced Grid with Staggered Animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16 justify-center max-w-7xl mx-auto"
        variants={projectAnimations.grid}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={projectAnimations.card}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { 
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            whileTap={{ scale: 0.98 }}
            className="transform-gpu" // Enable GPU acceleration
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Background Animation Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}