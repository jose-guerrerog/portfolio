import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: '#FFF',
      }}
    >
      <Container>
        <Typography color="#FFF">logo</Typography>
        <Typography color="#FFF">All rights reserved.</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
