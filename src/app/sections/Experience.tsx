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
import { experienceAnimations, createAlternatingVariants } from "@/lib/animations";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="max-w-7xl mx-auto py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={experienceAnimations.container}
    >
      {/* Timeline Section */}
      <motion.div className="mt-24" variants={experienceAnimations.timeline}>
        <VerticalTimeline animate>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company_name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={createAlternatingVariants(index)}
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
                    variants={experienceAnimations.icon}
                    whileHover="hover"
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
                <motion.div variants={experienceAnimations.content}>
                  <motion.h3
                    className="vertical-timeline-element-title text-black font-bold text-lg"
                    variants={experienceAnimations.listItem}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.h4
                    className="vertical-timeline-element-subtitle text-black font-semibold"
                    variants={experienceAnimations.listItem}
                  >
                    {exp.company_name}
                  </motion.h4>
                  <motion.ul
                    className="my-5 list-disc ml-5 space-y-2"
                    variants={experienceAnimations.content}
                  >
                    {exp.points.map((point, i) => (
                      <motion.li
                        key={`experience-point-${i}`}
                        className="text-gray-700 text-sm"
                        variants={experienceAnimations.listItem}
                        whileHover="hover"
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