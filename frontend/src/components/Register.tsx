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
  Stack // For vertical spacing
} from '@mui/material';

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

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD, { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    // Clear auth context error when component mounts or error changes
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
    } catch (error) {
    }
  }

  return (
    // Outer Box: Apply the same dark black and blue gradient background as HomePage/Login
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
        py: { xs: 4, sm: 6, md: 12 }, // Responsive vertical padding
        px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
        textAlign: 'center', // Keep for responsiveness if needed
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
        {/* Inner Box: The registration form card, consistent with HomePage/Login */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: { xs: 3, sm: 4, md: 5 }, // Consistent padding
            borderRadius: 3, // Consistent rounded corners
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)', // Deeper, cinematic shadow
            bgcolor: 'rgba(19, 47, 76, 0.88)', // Slightly translucent dark blue background
            backdropFilter: 'blur(8px)', // Subtle frosted glass effect (can be removed if performance is an issue)
            gap: 3, // Spacing between main sections
            border: '1px solid rgba(255, 255, 255, 0.08)', // Subtle border for definition
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            {/* Title: Create your account */}
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
              Create your account
            </Typography>
            {/* Link to sign in to existing account */}
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
              Or{" "}
              <Link to={PATH_LOGIN} style={{ textDecoration: 'none' }}>
                <Typography component="span" variant="body2" color="primary.main" sx={{
                    fontWeight: 'bold', // Make link text bold
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  sign in to your existing account
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
                id="name"
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus // Keep autoFocus for the first field
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name} // Pass boolean to error prop
                helperText={errors.name} // Pass error message to helperText
                variant="outlined" // Use outlined variant for modern look
                sx={{
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                  '& .MuiInputBase-input': { color: 'text.primary' },
                }}
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
                sx={{
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                  '& .MuiInputBase-input': { color: 'text.primary' },
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                  '& .MuiInputBase-input': { color: 'text.primary' },
                }}
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
                sx={{
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                  '& .MuiInputBase-input': { color: 'text.primary' },
                }}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained" // Solid background button
              size="large" // Larger button for better UX
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.8, // Consistent button padding
                borderRadius: 8, // Consistent button border radius
                bgcolor: 'primary.main', // Consistent primary color
                color: '#fff', // White text
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', // Deeper shadow for buttons
                transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition
                '&:hover': {
                  bgcolor: 'primary.dark', // Consistent hover effect
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6)', // More pronounced shadow on hover
                },
              }}
            >
              {isLoading ? (
                // Replaced custom spinner with MUI CircularProgress
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