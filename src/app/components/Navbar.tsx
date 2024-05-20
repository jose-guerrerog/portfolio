"use client";
import Link from "next/link";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { navLinks } from "../constants";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar sx={{ justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
        <IconButton
          color="inherit"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          edge="start"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navLinks.map((item) => (
            <Link
              href={item.path}
              key={item.title}
              color="#fff"
              style={{
                color: "#fff",
                marginRight: "20px",
                textDecoration: "none",
              }}
            >
              {item.title}
            </Link>
          ))}
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top", // Adjust to match the new position
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {navLinks.map((item) => (
            <MenuItem key={item.title}>
              <Link
                href={item.path}
                style={{
                  marginRight: "20px",
                  textDecoration: "none",
                }}
              >
                {item.title}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
