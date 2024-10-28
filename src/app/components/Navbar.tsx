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
  Stack,
  Typography,
} from "@mui/material";
import { navLinks } from "../constants";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pathname = usePathname();

  // const isOriginalVersion = version !== '1';

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
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
        <Box
          component='div'
          display={{ xs: "none", sm: "flex" }}
          justifyContent="space-between"
          alignItems='center'
          sx={{
            width: '100%'
          }}
        >
          <Box component='div' sx={{marginLeft: '20px'}}>
            <Link href="/">
              <h1 className="text-4xl fnt-semibold">
                Jose
                <span className="text-accent">.</span>
              </h1>
            </Link>
          </Box>
          <Stack flexDirection={'row'}>
            {navLinks.map((item) => (
              <Link
                href={
                  item.path
                }
                key={item.title}
                color={item.path === pathname ? "#00ff99" : "#fff"}
                style={{
                  color: item.path === pathname ? "#00ff99" : "#fff",
                  marginRight: "20px",
                  textDecoration: "none",
                }}
              >
                <Typography>
                  {item.title}
                </Typography>
              </Link>
            ))}
          </Stack>
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
