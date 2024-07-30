"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { icons } from "../constants";

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
      <Grid container rowGap={8} mt={8}>
        {icons.map((icon, index) => (
          <Grid xs={6} sm={3} container justifyContent="center" key={index}>
            <Box key={index}>
              <Box
                {...(icon.addBackground && {
                  borderRadius: "50%",
                  backgroundColor: "#b2b2b2",
                })}
              >
                <img
                  src={icon.icon}
                  width={120}
                  height={120}
                  alt="icon-skill"
                  style={{
                    maxWidth: "100%",
                    display: "block",
                    padding: "14px",
                  }}
                />
              </Box>

              {icon.name !== "" && (
                <Typography variant="body1" color="textPrimary">
                  {icon.name}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;
