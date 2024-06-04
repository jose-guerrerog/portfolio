"use client";
import {Box, Grid, Typography } from "@mui/material";
import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <Box component="section" id="projects">
      <Typography variant="h3" mt={6} fontWeight={700}
        sx={{
          background: "#2482ff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Projects
      </Typography>
      <Grid container mt={6} spacing={2}>
        {projects.map((project, index) => (
          <Grid key={index} item sm={4} xs={12}>
          <ProjectCard
            key={project.id}
            title={project.title}
            image={project.image}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
          />
        </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
