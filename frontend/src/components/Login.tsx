import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  PATH_DASHBOARD,
  PATH_REGISTER,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
  APP_NAME,
} from "../constants/appConstants"

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
} from "@mui/material"
import { SxProps, Theme } from '@mui/material/styles';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme<Theme>();


  useEffect(() => {
    // If the user is authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD, { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    clearError();
  }, [clearError])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) {
      newErrors.email = VALIDATION_EMAIL_REQUIRED
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_EMAIL_INVALID
    }
    if (!formData.password) {
      newErrors.password = VALIDATION_PASSWORD_REQUIRED
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
      await login(formData.email, formData.password)
    } catch (error) {
    }
  }

  const styles: { [key: string]: SxProps<Theme> } = {
    rootContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.gradients.darkPrimary,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 4 },
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
      color: theme.palette.text.primary,
    },
    innerBox: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: { xs: 3, sm: 5, md: 5 },
      borderRadius: theme.shape.borderRadius, 
      bgcolor: theme.palette.background.paper,
      boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 15px ${theme.palette.glow.main}30`, 
      gap: { xs: 2.5, sm: 3.5 }, 
      maxWidth: 600, 
      width: '100%',
    },
    titleContainer: { textAlign: 'center', width: '100%' },
    title: {
      mb: 1.5,
      fontWeight: 700,
      color: theme.palette.primary.light,
      textShadow: `0 0 10px ${theme.palette.glow.main}80`,
    },
    signUpLinkText: {
      fontWeight: 600,
      color: theme.palette.primary.main,
      transition: 'color 0.2s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.light,
        textDecoration: 'underline',
      }
    },
    formBox: {
      width: '100%',
      mt: 2,
    },
    alert: {
      mb: 3,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
    },
    inputStack: {
      mb: 4,
      gap: 2.5,
    },
    textField: {
      
    },
    submitButton: {
      mt: 2,
      mb: 2,
      py: { xs: 1.5, sm: 2 },
      borderRadius: theme.shape.borderRadius, 
    },
    progressInButton: {
      color: 'inherit',
      ml: 1,
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
                margin="normal"
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
                margin="normal"
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
  )
}

export default Login;