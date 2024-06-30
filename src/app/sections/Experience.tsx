"use client";
import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import {
  frontEndSkills,
  backEndSkills,
  collaborationSkills,
} from "../constants";
import Image from "next/image";

const Experience = () => {
  return (
    <Box component="section" id="experience">
      <Typography
        variant="h3"
        mt={10}
        fontWeight={700}
        sx={{
          background: "#2482ff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Skills
      </Typography>
      <Grid container columnGap={4} mt={6}>
        <Grid xs={12} sm={6} container justifyContent="center">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            src="/images/skills.jpeg"
            width={0}
            height={0}
            alt="skills"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          </Box>
        </Grid>
        <Grid xs={12} sm={5} container justifyContent="center">
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
          >
            FrontEnd
          </Typography>
          <Grid container rowGap={2} columnGap={1} mt={6}>
            {frontEndSkills.map((skill) => (
              <Chip label={skill} key={skill} />
            ))}
          </Grid>

          <Typography
            variant="h4"
            fontWeight={700}
            mt={6}
            color="primary"
          >
            BackEnd & Cloud
          </Typography>
          <Grid container rowGap={2} columnGap={1} mt={6}>
            {backEndSkills.map((skill) => (
              <Chip label={skill} key={skill} />
            ))}
          </Grid>
          <Typography
            variant="h4"
            fontWeight={700}
            mt={6}
            color="primary"
          >
            Collaboration
          </Typography>
          <Grid container rowGap={2} columnGap={1} mt={6}>
            {collaborationSkills.map((skill) => (
              <Chip label={skill} key={skill} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Experience;
