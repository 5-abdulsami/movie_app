import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  PATH_DASHBOARD,
  PATH_LOGIN,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
  VALIDATION_PASSWORD_MIN_LENGTH,
  VALIDATION_CONFIRM_PASSWORD_REQUIRED,
  VALIDATION_PASSWORDS_DO_NOT_MATCH,
  VALIDATION_NAME_REQUIRED,
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
  useTheme
} from '@mui/material';

import { getRegisterStyles } from './styles';
import { RegisterFormData, RegisterFormErrors, RegisterStyles } from './types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles: RegisterStyles = getRegisterStyles(theme); // Explicitly type styles

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.name) {
      newErrors.name = VALIDATION_NAME_REQUIRED;
    }

    if (!formData.email) {
      newErrors.email = VALIDATION_EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = VALIDATION_PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = VALIDATION_PASSWORD_MIN_LENGTH;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_PASSWORDS_DO_NOT_MATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error) {
      // Error handling is done by the auth context
    }
  };

  return (
    <Box sx={styles.rootContainer}>
      <Box sx={{ ...styles.backgroundEffect, top: '10%', left: '5%' }} />
      <Box sx={{ ...styles.backgroundEffect, bottom: '15%', right: '10%', animationDelay: '-10s' }} />
      
      <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
        <Box sx={styles.innerBox}>
          <Box sx={styles.titleContainer}>
            <Typography
              component="h1"
              variant="h4"
              sx={styles.title}
            >
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
              Already have an account?{" "}
              <Link to={PATH_LOGIN}>
                <Typography component="span" variant="body2" sx={styles.signInLinkText}>
                  Sign in
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
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={styles.textField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                sx={styles.textField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                sx={styles.textField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
                "Register"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;