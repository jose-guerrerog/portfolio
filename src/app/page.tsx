import Hero from "./sections/Hero";
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <div className="text-white">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
