"use client";
import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";

const ProjectCard2 = ({
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
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="image-card"
        />
        <CardContent>
          <Typography fontWeight={700} color="textPrimary">
            {title}
          </Typography>
          <Link href={githubLink}>
        <CodeIcon
          sx={{
            color: "#ADB7BE",
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
        </CardContent>
      </Card>
  );
};

export default ProjectCard2;
