"use client";

import React from "react";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const experienceVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="experience"
      className="max-w-7xl mx-auto py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Timeline Section */}
      <motion.div className="mt-24" variants={timelineVariants}>
        <VerticalTimeline animate>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company_name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={experienceVariants}
              custom={index}
              transition={{ delay: index * 0.2 }}
            >
              <VerticalTimelineElement
                visible
                date={exp.date}
                position={index % 2 === 0 ? "left" : "right"}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={
                  <motion.div
                    className="flex justify-center items-center w-full h-full"
                    variants={iconVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={exp.icon}
                      alt={exp.company_name}
                      fill
                      className="rounded-full"
                    />
                  </motion.div>
                }
                contentStyle={{
                  borderBottom: "8px solid " + exp.iconBg,
                  boxShadow: "none",
                }}
              >
                <motion.div variants={contentVariants}>
                  <motion.h3
                    className="vertical-timeline-element-title text-black font-bold text-lg"
                    variants={listItemVariants}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.h4
                    className="vertical-timeline-element-subtitle text-black font-semibold"
                    variants={listItemVariants}
                  >
                    {exp.company_name}
                  </motion.h4>
                  <motion.ul
                    className="my-5 list-disc ml-5 space-y-2"
                    variants={contentVariants}
                  >
                    {exp.points.map((point, i) => (
                      <motion.li
                        key={`experience-point-${i}`}
                        className="text-gray-700 text-sm"
                        variants={listItemVariants}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </VerticalTimelineElement>
            </motion.div>
          ))}
        </VerticalTimeline>
      </motion.div>
    </motion.section>
  );
}