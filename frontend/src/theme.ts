// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B0FF', // Primary Blue Color
      light: '#64B5F6', // Lighter shade of blue
      dark: '#0081CB',  // Darker shade of blue
    },
    secondary: {
      main: '#FF4081', // Contrasting pink/red accent color
    },
    background: {
      default: '#030712', // **EVEN DARKER:** A very deep, almost pure black for the default app background
      paper: '#1A2B43',   // **EVEN DARKER:** A very deep, dark blue for cards, forms, and surfaces
    },
    text: {
      primary: '#E0E0E0', // Light grey for primary text on dark backgrounds
      secondary: '#B0B0B0', // Slightly darker grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700, // Make headings bolder
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'uppercase', // Prevent uppercase transformation
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Consistent rounded corners for text fields
          },
        },
      },
    },
    MuiPaper: { // For components like Card, Dialog, etc. that use Paper
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAlert: { // For consistent styling of error messages
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;