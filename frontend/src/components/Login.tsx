import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  PATH_DASHBOARD,
  PATH_REGISTER,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
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

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as any)?.from?.pathname || PATH_DASHBOARD

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    // Clear auth context error when component mounts or error changes
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
      await login(formData.email, formData.password)
    } catch (error) {
      // Error is handled by the context
    }
  }

  return (
    // Outer Box: Apply the same dark black and blue gradient background
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right bottom, #050A13, #132F4C, #081A26)', // Consistent gradient
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 4, sm: 6, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        textAlign: 'center', // Keep for responsiveness if needed
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
        {/* Inner Box: The login form card, consistent with HomePage */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: { xs: 3, sm: 4, md: 5 }, // Consistent padding
            borderRadius: 3, // Consistent rounded corners
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)', // Deeper shadow
            bgcolor: 'rgba(19, 47, 76, 0.88)', // Slightly translucent dark blue background
            backdropFilter: 'blur(8px)', // Subtle frosted glass effect (can be removed if performance is an issue)
            gap: 3, // Spacing between elements
            border: '1px solid rgba(255, 255, 255, 0.08)', // Subtle border
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}> {/* Ensure text centering within the box */}
            {/* Title: Sign in to your account */}
            <Typography
              component="h1"
              variant="h4" // Consistent heading size
              sx={{
                mb: 1,
                fontWeight: 'bold',
                color: 'primary.light', // Consistent vibrant blue color
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Consistent text shadow
              }}
            >
              Sign in to your account
            </Typography>
            {/* Link to create new account */}
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
              Or{" "}
              <Link to={PATH_REGISTER} style={{ textDecoration: 'none' }}>
                <Typography component="span" variant="body2" color="primary.main" sx={{
                    fontWeight: 'bold', // Make link text bold
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  create a new account
                </Typography>
              </Link>
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}> {/* Consistent border radius for alerts */}
                {error}
              </Alert>
            )}

            <Stack spacing={2} sx={{ mb: 3 }}> {/* Stack for vertical spacing between inputs */}
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
                variant="outlined" // Use outlined variant for consistent look
                // Input specific styling for dark theme consistency
                InputLabelProps={{
                  style: { color: 'text.secondary' }, // Ensure label is visible
                }}
                InputProps={{
                  style: { color: 'text.primary' }, // Ensure input text is visible
                }}
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
                variant="outlined" // Use outlined variant
                 InputLabelProps={{
                  style: { color: 'text.secondary' },
                }}
                InputProps={{
                  style: { color: 'text.primary' },
                }}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.8, // Consistent button padding
                borderRadius: 8, // Consistent button border radius
                bgcolor: 'primary.main', // Consistent primary color
                color: '#fff', // White text
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', // Consistent button shadow
                transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition
                '&:hover': {
                  bgcolor: 'primary.dark', // Consistent hover effect
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6)', // Consistent hover shadow
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              ) : (
                "Sign in"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Login;