"use client";
import React from "react";
import { motion } from "framer-motion";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";
import { keyframes } from '@emotion/react';

const AboutSection = () => {
  const hue = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

  return (
    <Box component="section" id="about">
      <Grid container>
        <Grid xs={12} sm={5} item>

            <Typography variant="h2" fontWeight={700} sx={{
              background:  "-webkit-linear-gradient(45deg, #2196f3 30%, #21f364 90%)",
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: "transparent",
              // -webkit-animation: ${hue} 10s infinite linear;
              WebkitAnimation:  `${hue} 10s infinite linear`,
            }}>
              Welcome to my site
            </Typography>
            {/* </Typography>
                <img
                  src="https://refine.ams3.cdn.digitaloceanspaces.comundefined"
                  alt="image"
                /> */}
          {/* <Typography variant="h2" fontWeight={700}>
            Welcomet to my site
          </Typography> */}
          <Typography variant="body1" textAlign="justify" mt={2}>
            I&apos;m Jose and I am a software developer with a passion for
            creating interactive and responsive web applications. I am a team
            player and I am excited to work with others to create amazing
            applications.
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={7}
          container
          justifyContent="center"
          mt={{ xs: 2, sm: 0 }}
        >
          <Avatar
            alt="photo"
            src="/images/photo.png"
            style={{ width: 250, height: 250 }}
          />
        </Grid>
      </Grid>
      <Typography variant="h3" mt={4} fontWeight={700}>
        Skills
      </Typography>
      <Grid container rowGap={5} mt={5}>
        {icons.map((icon, index) => (
          <Grid xs={6} sm={3} container justifyContent="center" key={index}>
            <img
              src={icon}
              width={80}
              height={80}
              key={index}
              style={{ maxWidth: "100%", display: "block" }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutSection;
