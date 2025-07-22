import type React from "react"
import { Link } from "react-router-dom"
import {
  PATH_LOGIN,
  PATH_REGISTER,
  APP_NAME,
  APP_DESCRIPTION,
} from "../constants/appConstants"
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
} from "@mui/material"
import { SxProps, Theme } from '@mui/material/styles';

const HomePage: React.FC = () => {
  const theme = useTheme<Theme>();

  const styles: { [key: string]: SxProps<Theme> } = {
    rootContainer: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.gradients.darkPrimary,
      backgroundSize: "cover",
      backgroundPosition: "center",
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 4 },
      textAlign: "center",
      overflow: "hidden", 
      position: "relative", 
      color: theme.palette.text.primary,
    },
    contentBox: {
      position: 'relative', 
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: { xs: 3, sm: 4, md: 5 },
      maxWidth: 800,
      width: '100%',
    },
    appTitle: {
      fontWeight: 800,
      fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
      letterSpacing: '-0.03em',
      color: theme.palette.primary.contrastText,
      transition: 'color 0.3s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.light,
        textShadow: `0 0 30px ${theme.palette.glow.main}100, 0 0 40px ${theme.palette.glow.main}80`,
      },
    },
    appDescription: {
      fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.3rem' },
      color: theme.palette.text.secondary,
      maxWidth: 700,
      lineHeight: 1.7,
      opacity: 0.9,
    },
    buttonStack: {
      mt: { xs: 2, sm: 3 },
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 2, sm: 3 },
      width: '100%',
      justifyContent: 'center',
    },
    button: {
      minWidth: { xs: 'auto', sm: 180 },
      padding: '14px 30px',
      fontSize: '1.15rem',
      fontWeight: 700,
      borderRadius: 6,
    },
    
    backgroundEffect: {
      position: 'absolute',
      width: '100%',
      height: '90%',
      borderRadius: '20%',
      backgroundColor: theme.palette.primary.dark,
      opacity: 0.05,
      filter: 'blur(100px)',
      animation: 'blob-animation 20s infinite alternate ease-in-out',
      zIndex: 0,
    },
    '@keyframes blob-animation': {
      '0%': { transform: 'translate(0, 0) scale(1)' },
      '25%': { transform: 'translate(20%, -30%) scale(1.1)' },
      '50%': { transform: 'translate(0, 20%) scale(0.9)' },
      '75%': { transform: 'translate(-20%, -10%) scale(1.05)' },
      '100%': { transform: 'translate(0, 0) scale(1)' },
    },
  };

  return (
    <Box sx={styles.rootContainer}>
      <Box sx={{ ...styles.backgroundEffect, top: '10%', left: '5%' }} />
      <Box sx={{ ...styles.backgroundEffect, bottom: '15%', right: '10%', animationDelay: '-10s' }} />

      <Container maxWidth="md" sx={styles.contentBox}>
        <Typography
          component="h1"
          variant="h1"
          sx={styles.appTitle}
        >
          {APP_NAME}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={styles.appDescription}
        >
          {APP_DESCRIPTION}
        </Typography>
        <Stack sx={styles.buttonStack}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to={PATH_LOGIN}
            sx={styles.button}
          >
            SIGN IN
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to={PATH_REGISTER}
            sx={styles.button}
          >
            REGISTER
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;