"use client";

import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <section id="projects" className="w-full my-16 px-4 sm:px-10">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-[#2482ff] mb-8">
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14 justify-center">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            image={project.image}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
