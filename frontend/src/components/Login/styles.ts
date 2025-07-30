import { SxProps, Theme } from '@mui/material/styles';
import { LoginStyles } from './types';

export const getLoginStyles = (theme: Theme): LoginStyles => ({
  rootContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.gradients.darkPrimary,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    py: { xs: 2, sm: 3, md: 4 }, // Reduced vertical padding for root
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
    p: { xs: 2, sm: 3, md: 3 }, // Reduced padding for inner box
    borderRadius: theme.shape.borderRadius,
    bgcolor: theme.palette.background.paper,
    boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 15px ${theme.palette.glow.main}30`,
    gap: { xs: 2.5, sm: 3 }, // Adjust gap for general elements within inner box
    maxWidth: 400, // Make it consistent with Register form if desired, or keep as 600
    width: '100%',
    // No maxHeight or overflowY needed for Login as it's typically shorter
  },
  titleContainer: {
    textAlign: 'center',
    width: '100%'
  },
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
    mb: 2, // Reduced margin-bottom for alert
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  inputStack: {
    mb: 3, // Reduced margin-bottom for the stack of text fields
    gap: 2, // Adjusted gap between text fields now that margin="normal" is gone
  },
  textField: {
    // Empty as before, handled by Stack gap
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
    '@keyframes blob-animation': {
      '0%': { transform: 'translate(0, 0) scale(1)' },
      '25%': 'transform: translate(20%, -30%) scale(1.1)',
      '50%': 'transform: translate(0, 20%) scale(0.9)',
      '75%': 'transform: translate(-20%, -10%) scale(1.05)',
      '100%': 'transform: translate(0, 0) scale(1)',
    } as any, // Type assertion for keyframes
  },
});