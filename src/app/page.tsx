import Hero from "./sections/Hero";
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function Home() {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";

  if (isMaintenance) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">🚧 Maintenance Mode</h1>
          <p>We’ll be back soon. Thanks for your patience!</p>
        </div>
      </div>
    );
  }
  return (
    <div id="#home" className="text-white">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
