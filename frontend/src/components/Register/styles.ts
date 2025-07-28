import { SxProps, Theme } from '@mui/material/styles';
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
    mb: 3,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  inputStack: {
    mb: 4,
    gap: 2.5,
  },
  textField: {
    // Keeping this empty as it was in the original component, 
    // implying default TextField styling or custom styling handled elsewhere.
  },
  submitButton: {
    mt: 3,
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
});