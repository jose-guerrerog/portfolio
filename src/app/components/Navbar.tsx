"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-12 h-16">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">
            Jose<span className="text-[#00ff99]">.</span>
          </h1>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex gap-6 items-center">
          {navLinks.map((item) => {
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.title}
                href={item.path}
                className={`relative text-sm font-medium transition duration-200 ${
                  isActive ? "text-[#00ff99] font-semibold" : "text-white"
                } hover:text-[#00ff99]`}
              >
                {item.title}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#00ff99] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  } group-hover:w-full`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden bg-black/90 backdrop-blur px-6 py-4 space-y-3">
          {navLinks.map((item) => {
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.title}
                href={item.path}
                onClick={closeMenu}
                className={`block text-sm font-medium transition duration-200 ${
                  isActive ? "text-[#00ff99] font-semibold" : "text-white"
                } hover:text-[#00ff99]`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
