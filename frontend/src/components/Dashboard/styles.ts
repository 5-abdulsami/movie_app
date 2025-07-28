import { SxProps, Theme, darken } from '@mui/material/styles';
import { DashboardStyles } from './types';

export const getDashboardStyles = (theme: Theme): DashboardStyles => ({
  rootContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: { xs: 4, sm: 6, md: 12 },
    px: { xs: 2, sm: 3, md: 4 },
    background: theme.palette.gradients.darkPrimary,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    position: 'relative',
    color: theme.palette.text.primary,
  },
  dashboardContent: {
    width: '120%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: theme.shape.borderRadius,
  },
  headerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    gap: 2,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.light,
    textShadow: `0 0 10px ${theme.palette.glow.main}60`,
  },
  logoutButton: {
    py: 1,
    px: 3,
    borderRadius: theme.shape.borderRadius,
    bgcolor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    boxShadow: `0 4px 8px ${darken(theme.palette.error.main, 0.3)}`,
    transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
    '&:hover': {
      bgcolor: theme.palette.error.dark,
      boxShadow: `0 6px 12px ${darken(theme.palette.error.main, 0.5)}`,
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: `0 2px 8px ${darken(theme.palette.error.main, 0.3)}`,
    },
  },
  searchSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    mb: 4,
  },
  resultsSection: {
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    mt: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    color: theme.palette.text.primary,
  },
  errorAlert: {
    mb: 2,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    boxShadow: theme.shadows[2],
  },
  noResults: {
    color: theme.palette.text.secondary,
    mt: 4,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    justifyContent: 'center',
    gap: theme.spacing(9),
    width: '100%',
    alignItems: 'center',
    justifyItems: 'center', // Center items in their grid cells
    '@media (min-width: 600px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    },
    '@media (min-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    },
  },
  movieCardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  paginationContainer: {
    mt: 4,
    mb: 2,
    display: 'flex',
    justifyContent: 'center',
  }
}); 