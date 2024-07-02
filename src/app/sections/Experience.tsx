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
    <Box component="section" id="experience" mt={14}>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: "#2482ff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Skills
      </Typography>
      <Grid container mt={6} justifyContent='center'>
        <Grid xs={12} sm={7} container justifyContent='center'>
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
        </Grid>
        <Grid xs={12} sm={7} container justifyContent='center' mt={6}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
          >
            BackEnd & Cloud
          </Typography>
          <Grid container rowGap={2} columnGap={1} mt={6}>
            {backEndSkills.map((skill) => (
              <Chip label={skill} key={skill} />
            ))}
          </Grid>
        </Grid>
        <Grid xs={12} sm={7} container justifyContent='center' mt={6}>
          <Typography
            variant="h4"
            fontWeight={700}
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
