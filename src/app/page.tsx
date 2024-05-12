import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ margin: 4 }}>
        <HeroSection />
        <AboutSection />
        <EmailSection />
      </Box>
      <Footer />
    </>
  );
}
