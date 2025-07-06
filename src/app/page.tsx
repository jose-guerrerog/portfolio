import Hero from "./sections/Hero";
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <div id="#home" className="text-white">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
