// frontend/src/pages/HomePage/styles.ts
import { SxProps, Theme } from '@mui/material/styles';

interface HomePageStyles {
  rootContainer: SxProps<Theme>;
  contentBox: SxProps<Theme>;
  logoContainer: SxProps<Theme>;
  appTitle: SxProps<Theme>;
  appDescription: SxProps<Theme>;
  buttonStack: SxProps<Theme>;
  button: SxProps<Theme>;
  backgroundEffect: SxProps<Theme>;
}

export const getHomePageStyles = (theme: Theme): HomePageStyles => ({
  rootContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.gradients.darkPrimary,
    backgroundSize: "cover",
    backgroundPosition: "center",
    py: { xs: 3, sm: 4, md: 5 },
    px: { xs: 2, sm: 3, md: 4 },
    textAlign: "center",
    overflow: "hidden",
    position: "relative",
    color: theme.palette.text.primary,
  },
  contentBox: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: 3, sm: 4, md: 5 }, // Increased gap to give more breathing room
    maxWidth: 800,
    width: '100%',
  },
  logoContainer: {
    marginBottom: { xs: 1.5, sm: 2 }, // Increased space between the logo and title
    '& img': { // Directly target the img within this container
      width: 'auto',
      height: '150px', // Increased logo height for more prominence
      [theme.breakpoints.up('sm')]: {
        height: '150px', // Even larger on small and up screens
      },
    }
  },
  appTitle: {
    fontWeight: 800,
    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, // Increased font size for APP_NAME
    letterSpacing: '-0.03em',
    color: theme.palette.primary.contrastText,
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.light,
      textShadow: `0 0 30px ${theme.palette.glow.main}100, 0 0 40px ${theme.palette.glow.main}80`,
    },
  },
  appDescription: {
    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.2rem' },
    color: theme.palette.text.secondary,
    maxWidth: 700,
    lineHeight: 1.7,
    opacity: 0.9,
  },
  buttonStack: {
    mt: { xs: 1.5, sm: 2.5 },
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1.5, sm: 2 },
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    minWidth: { xs: 'auto', sm: 180 },
    padding: '12px 28px',
    fontSize: '1.05rem',
    fontWeight: 700,
    borderRadius: 6,
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
      '25%': { transform: 'translate(20%, -30%) scale(1.1)' },
      '50%': { transform: 'translate(0, 20%) scale(0.9)' },
      '75%': { transform: 'translate(-20%, -10%) scale(1.05)' },
      '100%': { transform: 'translate(0, 0) scale(1)' },
    } as any,
  },
});