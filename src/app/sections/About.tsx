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
import Link from "next/link";
import { motion } from "framer-motion";
import { icons } from "../constants";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Photo from "@/app/components/Photo";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { githubLink, linkedinLink } from "../constants";

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
  return (
    <Box component="section" id="about" mt={10}>
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
          <Typography
            variant="h2"
            textAlign="justify"
            color="textPrimary"
            fontWeight={700}
            mb={2}
          >
            Software Developer
          </Typography>
          <Typography variant="body1" textAlign="justify" color="textPrimary">
            I am a skilled and passionate software developer with experience in
            creating interactive web applications
          </Typography>
          <Stack flexDirection={"row"} gap={4} mt={5} alignItems={"center"}>
            <Button sx={{ border: "1px solid #00ff99" }}>
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
            <Stack direction="row" gap={2} alignItems="center">
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
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={5}
          container
          justifyContent="center"
          mt={{ xs: 2, sm: 0 }}
        >
          {/* <Avatar
            alt="photo"
            src="/images/photo.png"
            style={{ width: 350, height: 350 }}
          /> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.8,
                duration: 0.4,
                ease: "easeIn",
              },
            }}
            className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
          >
            <Image
              src="/images/photo.png"
              priority
              quality={100}
              width={270}
              height={330}
              alt=""
              className="object-contain"
            />
          </motion.div>

          {/* <Avatar.Image>
          <Image
            src="/images/photo.png"
            width={250}
            height={330}
            alt="photo"
            style={{
              // borderRadius: "50%",
              padding: '10px',
            }}
          />
          </Avatar.Image> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
