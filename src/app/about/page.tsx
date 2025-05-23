"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import Link from "next/link";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { githubLink, linkedinLink, experiences } from "../constants";
import dynamic from 'next/dynamic';
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

// Dynamically import Avatar model with custom loading state
const DynamicAvatar = dynamic(() => import("@/app/models/Avatar").then((mod) => mod.Avatar), {
  loading: () => <ModelLoader />,
  ssr: false,
});

const About = () => {
  const [visibleAvatar, setVisibleAvatar] = useState(false);

  // Load avatar with slight delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleAvatar(true);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
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
        >
          <Canvas
            style={{
              // width: "100%",
              height: "650px",
            }}
            shadows
            camera={{
              position: [0, 1, 4],
              fov: 30,
            }}
          >
            {/* Directly use Suspense with loader here as fallback */}
            <ambientLight intensity={1} />
            {visibleAvatar && (
              <group position-x={0.1} position-y={-0.8}>
                <DynamicAvatar />
              </group>
            )}
          </Canvas>
        </Grid>
      </Grid>
      <VerticalTimeline animate>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            visible
            className="vertical-timeline-element--work"
            // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            key={experience.company_name}
            // date={experience.date}
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
            {/* <div>
              <h3 className="text-black text-xl font-poppins font-semibold">
                {experience.title}
              </h3>
              <p
                className="text-black-500 font-medium text-base"
                style={{ margin: 0 }}
              >
                {experience.company_name}
              </p>
            </div> */}

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