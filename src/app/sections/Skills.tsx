"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";

const About = () => {
  return (
    <Box component="section" id="skills">
      <Typography variant="h3" mt={10} fontWeight={700}
        sx={{
          background: "#2482ff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Skills
      </Typography>
      <Grid container rowGap={5} mt={6}>
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
