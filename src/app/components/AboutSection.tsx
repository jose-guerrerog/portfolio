"use client";
import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";
import { TypeAnimation } from "react-type-animation";

const AboutSection = () => {
  return (
    <Box component="section" id="about">
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography
          variant="h1"
          fontWeight={700}
          fontStyle="italic"
          sx={{
            background: "linear-gradient(to left, #4c82ed, #FF6767 )",
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
        >
          <TypeAnimation
            sequence={["Welcome to my Site!", 500, "Hello World!", 500]}
            repeat={Infinity}
          />
        </Typography>
      </Box>
      <Grid container alignItems={'center'}>
        <Grid xs={12} sm={5} item>
          <Typography variant="body1" textAlign="justify" mt={2}>
            My name is Jose and I am a software developer with a passion for
            creating interactive and responsive web applications.
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
              alt="icon-skill"
              style={{ maxWidth: "100%", display: "block" }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutSection;
