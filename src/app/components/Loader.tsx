import { Html } from "@react-three/drei";
import {
  Box,
  CircularProgress,
} from '@mui/material'

const Loader = () => {
  return (
    <Html>
      <Box component='div' display="flex" justifyContent='center' alignItems='center'>
        <CircularProgress sx={{
          color: '#fff'
        }}/>
      </Box>
    </Html>
  );
};

export default Loader;
