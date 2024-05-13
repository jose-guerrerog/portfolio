"use client";
import React from "react";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <Box component="section">
      <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
        <Avatar
          alt="photo"
          src="/images/photo.jpeg"
          style={{ width: 250, height: 250 }}
        />
        <Box>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Hello, I'm Jose",
              1000,
              "Hello, I'm a software developer",
              1000,
            ]}
            speed={50}
            style={{ fontSize: "2em" }}
            repeat={Infinity}
          />
          <Typography>jnskdjnajdnjsdnajk jdanjdnajksdnkjas</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
