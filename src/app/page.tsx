import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" sx={{ margin: 4 }}>
        <Box width="100%" maxWidth={1000}>
          <ToastContainer />
          <About />
          <Contact />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
