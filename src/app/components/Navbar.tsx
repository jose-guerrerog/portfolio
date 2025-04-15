"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { navLinks } from "../constants";
import { usePathname } from "next/navigation";

// Hide navbar on scroll down, show on scroll up
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <HideOnScroll>
      <AppBar
        component="nav"
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent",
          transition: "all 0.3s ease-in-out",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <Toolbar>
          {/* Mobile logo */}
          <Box
            component="div"
            sx={{ 
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              justifyContent: "flex-start"
            }}
          >
            <Link href="/">
              <h1 className="text-3xl font-semibold">
                Jose<span className="text-[#00ff99]">.</span>
              </h1>
            </Link>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            edge="end"
            onClick={handleOpenNavMenu}
            sx={{ 
              display: { xs: "flex", sm: "none" },
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop navbar */}
          <Box
            component="div"
            display={{ xs: "none", sm: "flex" }}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            {/* Desktop logo */}
            <Box component="div" sx={{ marginLeft: "20px" }}>
              <Link href="/" className="no-underline">
                <h1 className="text-4xl font-semibold transition-all duration-300 hover:scale-105">
                  Jose<span className="text-[#00ff99]">.</span>
                </h1>
              </Link>
            </Box>

            {/* Desktop navigation links */}
            <Stack 
              flexDirection="row" 
              spacing={0} 
              mr={3} 
              alignItems="center"
              sx={{ 
                height: "100%",
                "& a": {
                  height: "100%",
                  display: "flex",
                  alignItems: "center"
                }
              }}
            >
              {navLinks.map((item) => {
                const isActive = item.path === pathname;
                return (
                  <Link
                    href={item.path}
                    key={item.title}
                    className="no-underline relative"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "64px", // Fixed height for all links
                      marginRight: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: isActive ? "#00ff99" : "#fff",
                        position: "relative",
                        padding: "8px 16px",
                        fontWeight: isActive ? 600 : 400,
                        transition: "all 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        height: "100%",
                        "&:hover": {
                          color: "#00ff99",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: isActive ? "100%" : "0%",
                          height: "2px",
                          bottom: "0",
                          left: "0",
                          backgroundColor: "#00ff99",
                          transition: "width 0.3s ease"
                        },
                        "&:hover::after": {
                          width: "100%"
                        }
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                );
              })}
            </Stack>
          </Box>

          {/* Mobile menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            keepMounted
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiPaper-root": {
                backgroundColor: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                mt: 5,
                minWidth: "200px",
                borderRadius: "8px"
              },
            }}
            MenuListProps={{
              sx: { py: 1 }
            }}
          >
            {/* Close button in mobile menu */}
            <Box 
  display="flex" 
  justifyContent="flex-end"
  paddingX={2}
  paddingTop={1}
>              <IconButton
                size="small"
                onClick={handleCloseNavMenu}
                sx={{ color: "#fff" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            {navLinks.map((item) => {
              const isActive = item.path === pathname;
              return (
                <MenuItem 
                  key={item.title} 
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor: isActive ? "rgba(0, 255, 153, 0.1)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 255, 153, 0.1)",
                    },
                    mx: 1,
                    borderRadius: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Link
                    href={item.path}
                    className="w-full no-underline"
                    style={{
                      color: isActive ? "#00ff99" : "#fff",
                      fontWeight: isActive ? 600 : 400,
                      display: "block",
                      padding: "4px 8px",
                    }}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;