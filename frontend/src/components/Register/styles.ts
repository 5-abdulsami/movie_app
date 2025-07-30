import { Theme } from '@mui/material/styles';
import { RegisterStyles } from './types';

export const getRegisterStyles = (theme: Theme): RegisterStyles => ({
  rootContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.gradients.darkPrimary,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    py: { xs: 1, sm: 2, md: 3 },
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
    p: { xs: 2, sm: 2.5, md: 3 }, // Reduced internal padding
    borderRadius: theme.shape.borderRadius,
    bgcolor: theme.palette.background.paper,
    boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 15px ${theme.palette.glow.main}30`,
    gap: { xs: 1.5, sm: 2 }, // Reduced gap between elements within the box
    maxWidth: 380,
    width: '100%',
    // Removed maxHeight and overflowY to ensure no scrolling
  },
  titleContainer: {
    textAlign: 'center',
    width: '100%'
  },
  title: {
    mb: 1, // Slightly reduced margin-bottom
    fontWeight: 600,
    color: theme.palette.primary.light,
    textShadow: `0 0 10px ${theme.palette.glow.main}80`,
  },
  signInLinkText: {
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
    mb: 2, // Slightly reduced margin-bottom for alert
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  inputStack: {
    mb: 2, // Reduced margin-bottom for the stack of text fields
    gap: 1.5, // Further reduced gap if needed, or rely on innerBox gap
  },
  textField: {
    // No specific changes here, as margin is now handled by Stack and its absence on TextField
  },
  submitButton: {
    mt: 2, // Reduced margin-top
    mb: 1, // Reduced margin-bottom
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
});