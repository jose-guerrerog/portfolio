import HomeClient from "./components/HomeClient";
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <div className="text-white">
      <HomeClient />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
