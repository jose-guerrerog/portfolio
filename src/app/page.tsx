import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" sx={{ margin: 4 }}>
        <Box width="100%" maxWidth={1000}>
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
