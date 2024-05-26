"use client";
import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";

const About = () => {
  return (
    <Box component="section" id="about">
      <Grid container alignItems={'center'}>
        <Grid xs={12} sm={5} item>
          <Typography variant="h6" textAlign="justify" fontStyle="italic" color='#7c3f00'>
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
      <Typography variant="h3" mt={4} fontWeight={700}
        sx={{
          background: "linear-gradient(to left,  #FF6767, #4c82ed )",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
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

export default About ;
