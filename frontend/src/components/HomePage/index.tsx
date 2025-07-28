import React from "react";
import { Link } from "react-router-dom";
import {
  PATH_LOGIN,
  PATH_REGISTER,
  APP_NAME,
  APP_DESCRIPTION,
} from "../../constants/appConstants";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
} from "@mui/material";

import { getHomePageStyles } from './styles'; // Import styles

const HomePage: React.FC = () => {
  const theme = useTheme();
  const styles = getHomePageStyles(theme); // Use the function to get styles

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