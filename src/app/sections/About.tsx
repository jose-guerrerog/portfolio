"use client";
import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";
import Image from 'next/image';
import Photo from '@/app/components/Photo';

const About = () => {
  return (
    <Box component="section" id="about" mt={10}>
      <Grid container alignItems={'center'}>
        <Grid xs={12} sm={7} item>
          <Typography variant="h5" textAlign="justify" color='textPrimary' mb={1}>
            Hello,
          </Typography>
          <Typography variant="h2" textAlign="justify" color='textPrimary' fontWeight={700}>
            I&apos;m <Typography component="span" variant="h2" color="#FCE205" fontWeight={700}>Jose</Typography>
          </Typography>
          <Typography variant="h2" textAlign="justify" color='textPrimary' fontWeight={700} mb={2}>
            Software Developer
          </Typography>
          <Typography variant="body1" textAlign="justify" color='textPrimary'>
            I am a skilled and passionate software developer with experience in creating interactive web applications
          </Typography>
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
          <Image
             src="/images/photo.png"
              width={300}
              height={380}
              alt='photo'
              style={{
                borderRadius: '20px'
              }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default About ;
