"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../constants";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold text-white tracking-wide hover:scale-105 transition-transform"
        >
          Jose<span className="text-[#00ff99]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.title}
                href={item.path}
                className={`relative text-white text-sm font-medium hover:text-[#00ff99] transition-colors duration-300 ${
                  isActive ? "text-[#00ff99]" : ""
                }`}
              >
                {item.title}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#00ff99]"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4 bg-black/90 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col gap-3 mt-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-white text-base font-medium px-2 py-2 rounded hover:bg-white/10 transition ${
                      isActive ? "text-[#00ff99]" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
