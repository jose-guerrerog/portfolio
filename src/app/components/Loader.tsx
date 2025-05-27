import { Html } from "@react-three/drei";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

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
