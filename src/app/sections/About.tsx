"use client";
import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";

const About = () => {
  return (
    <Box component="section" id="about">
      <Grid container alignItems={'center'}>
        <Grid xs={12} sm={5} item>
          <Typography variant="h6" textAlign="justify" fontStyle="italic" color='textPrimary'>
            My name is Jose and I am a software developer with a passion for
            creating interactive web applications.
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
    </Box>
  );
};

export default About ;
