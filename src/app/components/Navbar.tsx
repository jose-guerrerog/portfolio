"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";
import { useActiveSection } from "@/app/contexts/ActiveSectionContext";

export default function Navbar() {
  const { activeSection } = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          className="text-white text-3xl sm:text-4xl font-semibold"
        >
          Jose<span className="text-[#00ff99]">.</span>
        </Link>

        <div className="hidden md:flex space-x-10 items-center text-white text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-1 hover:text-[#00ff99] transition ${
                `#${activeSection}` === item.href ? "text-[#00ff99]" : ""
              }`}
            >
              {item.label}
              {`#${activeSection}` === item.href && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#00ff99]" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-black/90 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-lg font-medium border-b border-gray-700 ${
                `#${activeSection}` === item.href
                  ? "text-[#00ff99]"
                  : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
