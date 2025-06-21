"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaCode } from "react-icons/fa";
import OptimizedCardMedia from "./OptimizedCardMedia";

const ProjectCard = ({
  title,
  image,
  githubLink,
  demoLink,
  isPortfolio = false,
}: {
  title: string;
  image: string;
  githubLink: string;
  demoLink: string;
  isPortfolio?: boolean;
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className={`relative group rounded overflow-hidden shadow-lg`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* Overlay */}
      {isCardHovered && (
        <div className="absolute inset-0 bg-black opacity-50 z-10 transition duration-300" />
      )}

      {/* Image */}
      <div
        className={`${
          isPortfolio ? "border-t border-l border-r border-black rounded-t" : ""
        }`}
      >
        <OptimizedCardMedia image={image} title={title} />
      </div>

      {/* Title Section (Bottom) */}
      <div className="p-4 bg-black z-20 relative">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {/* Action buttons (hover) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex gap-4">
        <Link
          href={githubLink}
          className="h-11 w-11 flex items-center justify-center border-2 border-[#ADB7BE] hover:border-white rounded-full text-[#ADB7BE] hover:text-white transition-opacity duration-300"
          style={{ opacity: isCardHovered ? 1 : 0 }}
        >
          <FaCode className="w-5 h-5" />
        </Link>
        <Link
          href={demoLink}
          className="h-11 w-11 flex items-center justify-center border-2 border-[#ADB7BE] hover:border-white rounded-full text-[#ADB7BE] hover:text-white transition-opacity duration-300"
          style={{ opacity: isCardHovered ? 1 : 0 }}
        >
          <FaEye className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;