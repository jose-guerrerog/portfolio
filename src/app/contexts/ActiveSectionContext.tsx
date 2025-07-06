"use client";

import { createContext, useContext, useState } from "react";

const ActiveSectionContext = createContext<any>(null);

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}