"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";

const ProjectCard = ({
  title,
  image,
  githubLink,
  demoLink,
}: {
  title: string;
  image: string;
  githubLink: string;
  demoLink: string;
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const onMouseEnter = () => {
    setIsCardHovered(true);
  };
  const onMouseLeave = () => {
    setIsCardHovered(false);
  };
  return (
    <Box component="section" id="projects">
      <Box
        position="relative"
        component="div"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isCardHovered && (
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#000",
              zIndex: 1,
              opacity: 0.5,
            }}
          />
        )}
        <img
          src={image}
          width="100%"
          height="auto"
          alt="project-catd"
          style={{
            opacity: isCardHovered ? 0.8 : 1,
            maxWidth: "100%",
            display: "block",
          }}
        />
        <Link href={githubLink}>
          <CodeIcon
            sx={{
              color: "#ADB7BE",
              opacity: isCardHovered ? 1 : 0,
              position: "absolute",
              left: "35%",
              top: "40%",
              height: 40,
              width: 40,
              "&:hover": {
                color: "#FFFFFF",
              },
              zIndex: 2,
            }}
          />
        </Link>
        <Link href={demoLink}>
          <VisibilityIcon
            sx={{
              color: "#ADB7BE",
              opacity: isCardHovered ? 1 : 0,
              position: "absolute",
              left: "55%",
              top: "40%",
              height: 40,
              width: 40,
              "&:hover": {
                color: "#FFFFFF",
              },
              zIndex: 2,
            }}
          />
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography fontWeight={700}>{title}</Typography>
      </Box>
    </Box>
  );
};

export default ProjectCard;
