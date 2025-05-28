import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#121212",
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
        minHeight: '80px',
      }}
    >
      <Typography color="#FFF"> {`${new Date().getFullYear()} | All rights reserved.`}</Typography>
    </Box>
  );
};

export default Footer;
