'use client'

import { createTheme } from "@mui/material";
import { green, orange, grey, lightGreen, lime, purple } from '@mui/material/colors';
 
export const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: purple[700],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: green[500],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: green[200],
        },
      },
    },
  },
});
