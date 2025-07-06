"use client";

import React from "react";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";

export default function About() {

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16">
      {/* Timeline Section */}
      <div className="mt-24">
        <VerticalTimeline animate>
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              visible
              key={exp.company_name}
              date={exp.date}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={exp.icon}
                    alt={exp.company_name}
                    fill
                    className="rounded-full"
                  />
                </div>
              }
              contentStyle={{
                borderBottom: "8px solid " + exp.iconBg,
                boxShadow: "none",
              }}
            >
              <h3 className="vertical-timeline-element-title text-black font-bold text-lg">
                {exp.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-black font-semibold">
                {exp.company_name}
              </h4>
              <ul className="my-5 list-disc ml-5 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={`experience-point-${i}`} className="text-gray-700 text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
