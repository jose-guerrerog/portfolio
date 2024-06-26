import { Box } from "@mui/material";
import MainTitle from "./sections/MainTitle";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Experience from './sections/Experience';
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainTitle />
      <Box display="flex" justifyContent="center" m={4}>
        <Box width="100%" maxWidth={1000}>
          <ToastContainer />
          <About />
          <Experience /> 
          <Projects />
          <Contact />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
