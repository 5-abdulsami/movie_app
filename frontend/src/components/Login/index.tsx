// frontend/src/pages/Login/index.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  PATH_DASHBOARD,
  PATH_REGISTER,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
  APP_NAME,
} from "../../constants/appConstants";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
} from "@mui/material";

import { getLoginStyles } from './styles';
import { LoginFormData, LoginFormErrors } from './types';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getLoginStyles(theme);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  // IMPORTANT: Memoize validateForm with useCallback to prevent it from recreating on every render
  // AND ensure setErrors only updates if actual error state changes.
  const validateForm = React.useCallback(() => {
    const newErrors: LoginFormErrors = {};
    if (!formData.email) {
      newErrors.email = VALIDATION_EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_EMAIL_INVALID;
    }
    if (!formData.password) {
      newErrors.password = VALIDATION_PASSWORD_REQUIRED;
    }

    // Only update errors state if the newErrors object is actually different
    // from the current errors state (e.g., has different keys or values).
    // This deep comparison prevents unnecessary re-renders.
    if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.password, errors]); // Dependencies for useCallback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // CRITICAL FIX: Only clear the specific error if it's currently a non-empty string.
    // This prevents unnecessary `setErrors` calls if `errors[name]` is already an empty string
    // or undefined, which was causing the infinite re-render loop.
    if (errors[name] && errors[name] !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error for this field
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No change here, validateForm is now memoized
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error handling is done by the auth context
    }
  };

  return (
    <Box sx={styles.rootContainer}>
      <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
        <Box sx={styles.innerBox}>
          <Box sx={styles.titleContainer}>
            <Typography
              component="h1"
              variant="h4"
              sx={styles.title}
            >
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
              New to {APP_NAME}?{" "}
              <Link to={PATH_REGISTER}>
                <Typography component="span" variant="body2" sx={styles.signUpLinkText}>
                  Register Now!
                </Typography>
              </Link>
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={styles.formBox}>
            {error && (
              <Alert severity="error" sx={styles.alert}>
                {error}
              </Alert>
            )}

            <Stack spacing={2} sx={styles.inputStack}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                sx={styles.textField}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                sx={styles.textField}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={styles.submitButton}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={styles.progressInButton} />
              ) : (
                "SIGN IN"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;