import React from 'react'
import { Box, Grid, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <Box component='section'>
      <Grid container>
        <Grid xs={12} sm={7} item>
          <Typography variant="h2">
            Hello, I'm Jose
          </Typography>
          <Typography>
            jnskdjnajdnjsdnajk jdanjdnajksdnkjas
          </Typography>
        </Grid>
        <Grid xs={12} sm={5} item>
          fdkwmkdlmfklsd
        </Grid>
      </Grid>
    </Box>
  )
}

export default HeroSection;