"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const MainTitle = () => {
  return (
    <Box display="flex" justifyContent="center" mt={5} mb={10}>
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
  );
};

export default MainTitle;
