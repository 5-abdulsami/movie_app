import type React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN, PATH_REGISTER } from "../constants/appConstants";
import { SxProps, Theme } from '@mui/material/styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(PATH_LOGIN);
  };

  const handleRegisterClick = () => {
    navigate(PATH_REGISTER);
  };

  const styles: { [key: string]: SxProps<Theme> } = {
    rootContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    },
    innerBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: { xs: 3, sm: 4, md: 5 },
      borderRadius: 3,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
      bgcolor: 'rgba(19, 47, 76, 0.88)',
      backdropFilter: 'blur(8px)',
      gap: 4,
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    mainTitle: {
      fontWeight: 'bold',
      mb: 1,
      color: 'primary.light',
      textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
      letterSpacing: '0.1em',
    },
    tagline: {
      mb: 3,
      fontStyle: 'italic',
      opacity: 0.9,
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
      color: 'text.secondary',
    },
    buttonsStack: {
      width: '100%',
      maxWidth: 320,
    },
    loginButton: {
      py: 1.8,
      borderRadius: 8,
      bgcolor: 'primary.main',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        bgcolor: 'primary.dark',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6)',
      },
    },
    registerButton: {
      py: 1.8,
      borderRadius: 8,
      borderColor: 'primary.light',
      color: 'primary.light',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        borderColor: 'primary.main',
        backgroundColor: 'rgba(0, 176, 255, 0.15)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      },
    },
  };

  return (
    <Box sx={styles.rootContainer}>
      <Container component="main" maxWidth="sm" sx={{ width: '100%' }}>
        <Box sx={styles.innerBox}>
          <Typography component="h1" variant="h2" sx={styles.mainTitle}>
            MOVIE APP
          </Typography>
          <Typography variant="subtitle1" sx={styles.tagline}>
            Your ultimate cinematic journey begins here.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={styles.buttonsStack}
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLoginClick}
              sx={styles.loginButton}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleRegisterClick}
              sx={styles.registerButton}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;