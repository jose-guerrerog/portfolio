"use client";
import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
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
      <Card>
        <CardMedia
          component="img"
          // height="250"
          image={image}
          alt="image-card"
        />
        <CardContent>
          <Typography fontWeight={700} color="textPrimary">
            {title}
          </Typography>
        </CardContent>
      </Card>

      <Link href={githubLink} 
        style={{
          border: '#adb7be',
          height: '45px',
          width: '45px',
          borderRadius: '50%',
        }}
      className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link">
        <CodeIcon
          sx={{
            color: "#ADB7BE",
            opacity: isCardHovered ? 1 : 0,
            position: "absolute",
            left: "35%",
            top: "40%",
            height: 60,
            width: 60,
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
            height: 60,
            width: 60,
            "&:hover": {
              color: "#FFFFFF",
            },
            zIndex: 2,
          }}
        />
      </Link>
    </Box>
  );
};

export default ProjectCard;
