// src/app/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full py-6 px-10 sm:px-20 flex justify-between items-center font-semibold text-white text-lg">
      <div className="text-3xl font-bold">
        Jose<span className="text-[#00ffcc]">.</span>
      </div>
      <nav className="flex gap-10">
        {["Home", "About", "Projects", "Contact"].map((name) => {
          const path = name === "Home" ? "/" : `/${name.toLowerCase()}`;
          const isActive = pathname === path;

          return (
            <Link
              key={name}
              href={path}
              className={`relative hover:text-[#00ffcc] transition duration-200 ${
                isActive ? "text-[#00ffcc]" : ""
              }`}
            >
              {name}
              {isActive && (
                <span className="absolute -bottom-[6px] left-0 w-full h-[2px] bg-[#00ffcc]" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
