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
      <Box display="flex" justifyContent="center" sx={{ margin: 4 }}>
        <Box width="100%" maxWidth={1000}>
          <HeroSection />
          <AboutSection />
          <EmailSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
