import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#000",
        minHeight: '80px',
      }}
    >
      <Typography color="#FFF"> {`${new Date().getFullYear()} | All rights reserved.`}</Typography>
    </Box>
  );
};

export default Footer;
