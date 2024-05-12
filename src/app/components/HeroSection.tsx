import React from 'react'
import { Box, Grid, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <Box component='section'>
      <Grid container>
        <Grid xs={1} lg={7} item>
          <Typography>
            Hello, I'm Jose
          </Typography>
          <Typography>
            jnskdjnajdnjsdnajk jdanjdnajksdnkjas
          </Typography>
        </Grid>
        <Grid xs={1} lg={5} item>
          fdkwmkdlmfklsd
        </Grid>
      </Grid>
    </Box>
  )
}

export default HeroSection;