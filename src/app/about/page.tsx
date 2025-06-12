"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { githubLink, linkedinLink, experiences } from "../constants";
import { Avatar } from '@/app/models/Avatar'; // Named import
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

// Simple loading component for avatar loading
const ModelLoader = () => {
  return (
    <mesh position={[0, 1.1, 0]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#4c82ed" wireframe />
    </mesh>
  );
};

// Loading component that shows outside Canvas
const CanvasLoader = () => (
  <div style={{ 
    height: 650, 
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px'
  }}>
    Loading 3D...
  </div>
);

const About = () => {
  const [visibleAvatar, setVisibleAvatar] = useState(false);
  const [shouldLoadAvatar, setShouldLoadAvatar] = useState(false);
  const [lightsReady, setLightsReady] = useState(false);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for avatar - only load when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadAvatar(true);
          // Small delay for smoother experience
          setTimeout(() => setVisibleAvatar(true), 200);
          // Delay lighting setup
          setTimeout(() => setLightsReady(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );
    
    if (avatarContainerRef.current) {
      observer.observe(avatarContainerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      id="about"
      mt={{
        xs: 0,
        md: 5,
      }}
      maxWidth={1000}
    >
      <Grid container alignItems={"center"} mb={7}>
        <Grid xs={12} md={7} item>
          <Typography
            variant="h5"
            textAlign="justify"
            color="textPrimary"
            mb={1}
          >
            Hello,
          </Typography>
          <Typography
            variant="h2"
            textAlign="justify"
            color="textPrimary"
            fontWeight={700}
          >
            I&apos;m{" "}
            <Typography
              component="span"
              variant="h2"
              color="#FCE205"
              fontWeight={700}
            >
              Jose
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            textAlign="justify"
            color="textPrimary"
            mt={2}
          >
            I am a skilled and passionate software developer with experience in
            creating interactive web applications
          </Typography>
          <Stack flexDirection={"row"} gap={1} mt={5} alignItems={"center"}>
            <Button sx={{ border: "1px solid #00ff99", borderRadius: "36px" }}>
              <MuiLink
                href="/assets/Resume - Jose Guerrero.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                underline="none"
              >
                <Stack flexDirection={"row"} gap={1} px={2} py={1}>
                  <Typography textTransform={"capitalize"} color="#00ff99">
                    Download Resume
                  </Typography>
                  <FileDownloadIcon htmlColor="#00ff99" />
                </Stack>
              </MuiLink>
            </Button>
            <Button sx={{ border: "1px solid #fff", borderRadius: "36px" }}>
              <Link href="/contact">
                <Stack flexDirection={"row"} gap={1} px={2} py={1}>
                  <Typography textTransform={"capitalize"} color="#fff">
                    Contact Me
                  </Typography>
                </Stack>
              </Link>
            </Button>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" mt={4}>
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
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={5}
          container
          justifyContent="center"
          mt={{ xs: 2, sm: 0 }}
          ref={avatarContainerRef}
        >
          {shouldLoadAvatar ? (
            <Canvas
              style={{
                height: "650px",
                width: "100%",
                backgroundColor: "transparent",
              }}
              shadows={false} // Disable shadows for better performance
              dpr={[1, 1.5]} // Limit device pixel ratio
              performance={{ min: 0.5 }} // Allow performance drops
              gl={{ 
                alpha: true, // Enable transparency
                antialias: false, // Disable expensive antialiasing initially
                powerPreference: "high-performance",
                stencil: false, // Disable stencil buffer
              }}
              camera={{
                position: [0, 1, 4],
                fov: 30,
              }}
            >
              {/* Progressive lighting setup */}
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
        </Grid>
      </Grid>
      
      {/* Timeline section */}
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
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </div>
            }
            contentStyle={{
              borderBottom: "8px",
              borderStyle: "solid",
              borderBottomColor: experience.iconBg,
              boxShadow: "none",
            }}
          >
            <h3 className="vertical-timeline-element-title" color="black">
              {experience.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle" color="black">
              {experience.company_name}
            </h4>

            <ul className="my-5 list-disc ml-5 space-y-2">
              {experience.points.map((point, index) => (
                <li
                  key={`experience-point-${index}`}
                  className="text-white-500/50 font-normal pl-1 text-sm"
                  color="black"
                >
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Box>
  );
};

export default About;