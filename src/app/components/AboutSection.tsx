"use client";
import React, { useTransition, useState } from "react";
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { icons } from "../constants";

const AboutSection = () => {
  
  return (
    <Box component="section" id="about">
      <Grid container>
        <Grid xs={12} sm={5} item>
          <Typography variant="h2">
            Hello
          </Typography>
          <Typography variant="body1" textAlign="justify">
            I'm Jose and I am a software developer with a passion for creating
            interactive and responsive web applications. I am a team player and
            I am excited to work with others to create amazing applications.
          </Typography>
        </Grid>
        <Grid xs={12} sm={7} container justifyContent='center' mt={{ xs: 2, sm: 0}}>
          <Avatar
            alt="photo"
            src="/images/photo.png"
            style={{ width: 250, height: 250 }}
          />
        </Grid>
      </Grid>
      <Typography variant="h3" mt={4}>Skills</Typography>
      <Grid container rowGap={5} mt={5}>
      {
        icons.map((icon, index) => (
          <Grid xs={6} sm={3} container justifyContent="center" key={index}>
            <img src={icon} width={80} height={80} key={index} style={{ maxWidth: '100%', display: 'block' }} />
          </Grid>

        ))
      }
      </Grid>
    </Box>
  );
};

export default AboutSection;