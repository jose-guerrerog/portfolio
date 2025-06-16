"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "@/app/models/Avatar";
import Link from "next/link";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { githubLink, linkedinLink, experiences } from "../constants";

const CanvasLoader = () => (
  <div className="h-[500px] w-full flex justify-center items-center text-white text-lg">
    Loading 3D...
  </div>
);

export default function About() {
  const [visibleAvatar, setVisibleAvatar] = useState(false);
  const [shouldLoadAvatar, setShouldLoadAvatar] = useState(false);
  const [lightsReady, setLightsReady] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadAvatar(true);
          setTimeout(() => setVisibleAvatar(true), 200);
          setTimeout(() => setLightsReady(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (avatarRef.current) {
      observer.observe(avatarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16">
      {/* Top section: Intro and Avatar */}
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
        <div
          ref={avatarRef}
          className="md:w-1/2 w-full flex justify-center items-center"
        >
          {shouldLoadAvatar ? (
            <Canvas
              style={{
                height: "600px",
                width: "100%",
                backgroundColor: "transparent",
              }}
              dpr={[1, 1.5]}
              shadows={false}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
              }}
              camera={{ position: [0, 1, 4], fov: 30 }}
            >
              <ambientLight intensity={lightsReady ? 1 : 0.5} />
              {lightsReady && (
                <>
                  <directionalLight position={[5, 5, 5]} intensity={0.8} />
                  <pointLight position={[-5, 2, 5]} intensity={0.3} />
                </>
              )}
              {visibleAvatar && (
                <Suspense fallback={null}>
                  <group position-y={-1} scale={[1.1, 1.1, 1.1]}>
                    <Avatar />
                  </group>
                </Suspense>
              )}
            </Canvas>
          ) : (
            <CanvasLoader />
          )}
        </div>
      </div>

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
