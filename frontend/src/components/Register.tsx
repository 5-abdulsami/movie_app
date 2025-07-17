import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
// Import validation & path constants
import {
  PATH_DASHBOARD,
  PATH_LOGIN,
  VALIDATION_NAME_REQUIRED,
  VALIDATION_NAME_MIN_LENGTH,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
  VALIDATION_PASSWORD_MIN_LENGTH,
  VALIDATION_CONFIRM_PASSWORD_REQUIRED,
  VALIDATION_PASSWORDS_DO_NOT_MATCH,
} from "../constants/appConstants"

// Import Material-UI components
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';

import { SxProps, Theme } from '@mui/material/styles';

const Register: React.FC = () => {
  // State to manage form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Access the authentication context
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Clear auth context error when component mounts or error changes
  useEffect(() => {
    clearError()
  }, [clearError])

  // Validate form data before submission
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = VALIDATION_NAME_REQUIRED
    } else if (formData.name.trim().length < 2) {
      newErrors.name = VALIDATION_NAME_MIN_LENGTH
    }

    if (!formData.email) {
      newErrors.email = VALIDATION_EMAIL_REQUIRED
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_EMAIL_INVALID
    }

    if (!formData.password) {
      newErrors.password = VALIDATION_PASSWORD_REQUIRED
    } else if (formData.password.length < 6) {
      newErrors.password = VALIDATION_PASSWORD_MIN_LENGTH
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_CONFIRM_PASSWORD_REQUIRED
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_PASSWORDS_DO_NOT_MATCH
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await register(formData.name.trim(), formData.email, formData.password)
      if (isAuthenticated) {
        navigate(PATH_DASHBOARD, { replace: true });
      }
    } catch (error) {
    }
  }

  const styles: { [key: string]: SxProps<Theme> } = {
    // Outer Box: Apply the same dark black and blue gradient background as HomePage/Login
    rootContainer: {
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
    },
    // Inner Box: The registration form card, consistent with HomePage/Login
    innerBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: { xs: 3, sm: 4, md: 5 },
      borderRadius: 3, 
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
      bgcolor: 'rgba(19, 47, 76, 0.88)',
      backdropFilter: 'blur(8px)',
      gap: 3,
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    titleContainer: { textAlign: 'center', width: '100%' },
    // Title: Create your account
    title: {
      mb: 1,
      fontWeight: 'bold',
      color: 'primary.light',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    },
    // Link to sign in to existing account
    signInLinkText: {
      fontWeight: 'bold',
      '&:hover': { textDecoration: 'underline' }
    },
    formBox: {
      width: '100%',
      mt: 1,
    },
    // Consistent border radius for alerts
    alert: {
      mb: 2,
      borderRadius: 2
    },
    // Stack for vertical spacing between inputs
    inputStack: {
      mb: 3,
    },
    textField: {
      '& .MuiInputLabel-root': { color: 'text.secondary' },
      '& .MuiInputBase-input': { color: 'text.primary' },
    },
    submitButton: {
      mt: 3,
      mb: 2,
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
  };

  return (
    <Box sx={styles.rootContainer}>
      <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
        {/* Inner Box: The registration form card, consistent with HomePage/Login */}
        <Box sx={styles.innerBox}>
          <Box sx={styles.titleContainer}>
            {/* Title: Create your account */}
            <Typography
              component="h1"
              variant="h4"
              sx={styles.title}
            >
              Create your account
            </Typography>
            {/* Link to sign in to existing account */}
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
              Or{" "}
              <Link to={PATH_LOGIN} style={{ textDecoration: 'none' }}>
                <Typography component="span" variant="body2" color="primary.main" sx={styles.signInLinkText}>
                  sign in to your existing account
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

            {/* Stack for vertical spacing between inputs */}
            <Stack spacing={2} sx={styles.inputStack}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus // Keep autoFocus for the first field
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
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              ) : (
                "Create account"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Register