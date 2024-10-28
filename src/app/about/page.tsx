"use client";
import React, { experimental_taintObjectReference } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { githubLink, linkedinLink, experiences } from "../constants";
import { TypeAnimation } from "react-type-animation";
// import {useSearchParams} from "next/navigation";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";



// const experiences = [
//   {
//     company_name: "Ansarada",
//     iconBg: "black",
//     title: "Front-End Developer",
//     date: "03-04-24",
//     icon: '/images/ansarada_logo.jpeg',
//     points: [5, 4],
//   },
//   {
//     company_name: "Medius Health",
//     iconBg: "black",
//     title: "Front-End Developer",
//     date: "03-04-24",
//     icon: '/images/medius_health_logo.jpeg',
//     points: [5, 4],
//   },
// ];
const socials: { icon: React.ReactNode; path: string }[] = [
  {
    icon: <FaGithub />,
    path: githubLink,
  },
  {
    icon: <FaLinkedinIn />,
    path: linkedinLink,
  },
];

const About = () => {
  // const searchParams = useSearchParams();
  // const version = searchParams.get('version');
  // const isOriginalVersion = version !== '1';
  return (
    <Box component="section" id="about" mt={10} maxWidth={1000}>
      <Grid container alignItems={"center"}>
        <Grid xs={12} sm={7} item>
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
          {/* <Typography
            variant="h3"
            fontWeight={700}
            fontStyle="italic"
            sx={{
              background: "#fff",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              "@keyframes shine": {
                from: {
                  WebkitFilter: "hue-rotate(0deg)",
                },
                to: {
                  WebkitFilter: "hue-rotate(-360deg)",
                },
              },
              animation: `shine 5s linear infinite`,
            }}
            mt={1}
            mb={3}
          >
            <TypeAnimation
              sequence={[
                "React/NextJs Dev",
                500,
                "Full-Stack Dev",
                500,
                "Web Developer",
                500,
              ]}
              repeat={Infinity}
            />
          </Typography> */}

          <Typography variant="body1" textAlign="justify" color="textPrimary">
            I am a skilled and passionate software developer with experience in
            creating interactive web applications
          </Typography>
          <Stack flexDirection={"row"} gap={1} mt={5} alignItems={"center"}>
            <Button sx={{ border: "1px solid #00ff99", borderRadius: "36px" }}>
              <MuiLink
                href="/assets/resume.pdf"
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
          sm={5}
          container
          justifyContent="center"
          mt={{ xs: 2, sm: 0 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                // delay: 1,
                duration: 0.2,
                // ease: "easeIn",
              },
            }}
            // className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
          >
            <Avatar
              alt="photo"
              // src="/images/photo.png"
              style={{ width: 330, height: 330, backgroundColor: "#ccc" }}
            >
              <Image
                // src={isOriginalVersion ?"/images/photo.png" : "/images/photo-peter.png" }
                src={"/images/photo.png"}
                priority
                quality={100}
                width={300}
                height={330}
                alt=""
                className="object-contain"
              />
            </Avatar>
          </motion.div>
        </Grid>
      </Grid>
      <VerticalTimeline
        animate
      >
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            visible
            className="vertical-timeline-element--work"
            // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            key={experience.company_name}
            // date={experience.date}
            date={experience.date}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={experience.icon}
                  alt={experience.company_name}
                  fill
                  style={{
                    borderRadius: '50%'
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
           
            <h3 className="vertical-timeline-element-title" color="black">{experience.title}</h3>
    <h4 className="vertical-timeline-element-subtitle" color="black">{experience.company_name}</h4>
   

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
