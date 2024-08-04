import { Box } from "@mui/material";
import MainTitle from "./sections/MainTitle";
import About from "./sections/About";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <Box>
      <MainTitle />
      <ToastContainer />
      <About />
    </Box>
  );
}
