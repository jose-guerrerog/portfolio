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
      <Box display="flex" justifyContent="center" my={16} mx={{ xs: 6, sm: 16}}>
        <Box width="100%" maxWidth={1000}>
          <ToastContainer />
          <About />
          <Projects />
          <Experience /> 

          <Contact />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
