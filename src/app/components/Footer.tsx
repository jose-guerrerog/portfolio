"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center min-h-[80px] bg-[#121212] bg-[rgba(255,255,255,0.09)] bg-blend-overlay text-white text-sm">
      {`${new Date().getFullYear()} | All rights reserved.`}
    </footer>
  );
};

export default Footer;