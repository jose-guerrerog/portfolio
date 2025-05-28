"use client";

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <Box component="section" id="projects" my={3} sx={{ width: '100%'}}>
      <Typography variant="h3" fontWeight={700}
        sx={{
          background: "#2482ff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Projects
      </Typography>
      <Grid container mt={4} rowSpacing={5} columnSpacing={3}>
        {projects.map((project, index) => (
          <Grid key={index} item md={4} xs={12}>
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
