import React from "react";
import { Box, Typography, useTheme, Container, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.gradients.darkPrimary,
        color: theme.palette.text.primary,
        py: { xs: 4, sm: 6, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            background: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: theme.palette.primary.light,
              textAlign: "center",
            }}
          >
            My Profile
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Name: <span style={{ fontWeight: 400 }}>{user?.name || "-"}</span>
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Email: <span style={{ fontWeight: 400 }}>{user?.email || "-"}</span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
