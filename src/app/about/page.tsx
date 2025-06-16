"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { githubLink, linkedinLink, experiences } from "../constants";
import { Avatar } from '@/app/models/Avatar';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const ModelLoader = () => (
  <mesh position={[0, 1.1, 0]}>
    <sphereGeometry args={[0.2, 16, 16]} />
    <meshStandardMaterial color="#4c82ed" wireframe />
  </mesh>
);

const CanvasLoader = () => (
  <div className="h-[650px] w-full flex items-center justify-center text-white text-lg">
    Loading 3D...
  </div>
);

const About = () => {
  const [visibleAvatar, setVisibleAvatar] = useState(false);
  const [shouldLoadAvatar, setShouldLoadAvatar] = useState(false);
  const [lightsReady, setLightsReady] = useState(false);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadAvatar(true);
        setTimeout(() => setVisibleAvatar(true), 200);
        setTimeout(() => setLightsReady(true), 400);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (avatarContainerRef.current) {
      observer.observe(avatarContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="max-w-[1000px] mx-auto px-4 mt-10">
      <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
        <div className="md:w-2/3">
          <h5 className="text-xl mb-2">Hello,</h5>
          <h2 className="text-4xl font-bold mb-2">
            I'm <span className="text-yellow-400">Jose</span>
          </h2>
          <p className="text-justify text-gray-300 mb-6">
            I am a skilled and passionate software developer with experience in
            creating interactive web applications
          </p>
          <div className="flex gap-4 mb-4">
            <a
              href="/assets/Resume - Jose Guerrero.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 border border-green-400 rounded-full px-4 py-2 text-green-400 hover:bg-green-400 hover:text-black transition"
            >
              Download Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0l3-3m-3 3l-3-3m9 6H6"
                />
              </svg>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition"
            >
              Contact Me
            </Link>
          </div>
          <div className="flex gap-4 mt-4 items-center">
            <Link href={githubLink}>
              <Image src="/images/github-mark-white.svg" alt="Github" width={35} height={35} />
            </Link>
            <Link href={linkedinLink}>
              <Image src="/images/linkedin-icon.svg" alt="LinkedIn" width={45} height={45} />
            </Link>
          </div>
        </div>
        <div className="md:w-1/3 w-full" ref={avatarContainerRef}>
          {shouldLoadAvatar ? (
            <Canvas
              style={{ height: "650px", width: "100%" }}
              shadows={false}
              dpr={[1, 1.5]}
              performance={{ min: 0.5 }}
              gl={{
                alpha: true,
                antialias: false,
                powerPreference: "high-performance",
                stencil: false,
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
                <Suspense fallback={<ModelLoader />}>
                  <group position-x={0.1} position-y={-0.8}>
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

      <VerticalTimeline animate>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            visible
            className="vertical-timeline-element--work"
            key={experience.company_name}
            date={experience.date}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={experience.icon}
                  alt={experience.company_name}
                  fill
                  style={{ borderRadius: "50%" }}
                />
              </div>
            }
            contentStyle={{
              borderBottom: "8px solid " + experience.iconBg,
              boxShadow: "none",
            }}
          >
            <h3 className="text-black text-lg font-semibold">
              {experience.title}
            </h3>
            <h4 className="text-black text-md font-medium">
              {experience.company_name}
            </h4>
            <ul className="my-5 list-disc ml-5 space-y-2">
              {experience.points.map((point, i) => (
                <li
                  key={`experience-point-${i}`}
                  className="text-sm text-gray-700"
                >
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default About;
