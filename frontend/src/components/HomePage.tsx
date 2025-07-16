import React from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import {
  Container,
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material';

import { PATH_LOGIN, PATH_REGISTER } from '../constants/appConstants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(PATH_LOGIN);
  };

  const handleRegisterClick = () => {
    navigate(PATH_REGISTER);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right bottom, #050A13, #132F4C, #081A26)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 4, sm: 6, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        textAlign: 'center',
        overflow: 'hidden', 
        position: 'relative', 
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ width: '100%' }}>
        {/* Inner Box: The main card/container for content */}
        <Box
          sx={{
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
          }}
        >
          {/* Main Title: MOVIE APP */}
          <Typography
            component="h1"
            variant="h2" 
            sx={{
              fontWeight: 'bold',
              mb: 1, 
              color: 'primary.light', 
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)', 
              letterSpacing: '0.1em', 
            }}
          >
            MOVIE APP
          </Typography>
          {/* Tagline */}
          <Typography
            variant="subtitle1" 
            color="text.secondary" 
            sx={{
              mb: 3, 
              fontStyle: 'italic', 
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            Your ultimate cinematic journey begins here.
          </Typography>

          {/* Buttons Stack */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            sx={{ width: '100%', maxWidth: 320 }} 
          >
            <Button
              variant="contained" 
              size="large"
              fullWidth
              onClick={handleLoginClick}
              sx={{
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
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined" 
              size="large"
              fullWidth
              onClick={handleRegisterClick}
              sx={{
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
              }}
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
