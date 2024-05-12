import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    // <Box component="footer">
    //   <Container>
    //     <Typography>logo</Typography>
    //     <Typography>All rights reserved.</Typography>
    //   </Container>

    // </Box>
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>LOGO</span>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;