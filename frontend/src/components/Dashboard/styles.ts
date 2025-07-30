import { SxProps, Theme, darken } from '@mui/material/styles';
import { DashboardStyles } from './types';

export const getDashboardStyles = (theme: Theme): DashboardStyles => ({
  rootContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: { xs: 4, sm: 6, md: 8 }, // Consistent vertical padding
    px: { xs: 2, sm: 3, md: 4 }, // Consistent horizontal padding
    background: theme.palette.gradients.darkPrimary,
    overflowY: 'auto', // Enable vertical scrolling for the page
    overflowX: 'hidden', // Prevent horizontal scrolling on the root
    position: 'absolute',
    color: theme.palette.text.primary,
  },
  dashboardContent: {
    width: '100%', // Use 100% width and rely on maxWidth
    maxWidth: 1280, // Maintain max width for large screens
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4), // Balanced overall gap between major sections (e.g., header, search, movie rows)
    p: { xs: 2, sm: 3, md: 4 }, // Padding inside the content box
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden', // Ensures content within this box adheres to its boundaries
  },
  headerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2), // Gap between title and logout button on small screens
    marginBottom: theme.spacing(2), // Clearer separation from search bar
  },
  title: {
    fontWeight: 500,
    color: theme.palette.primary.light,
    textShadow: `0 0 10px ${theme.palette.glow.main}60`,
    fontSize: '2rem', // Main dashboard title size
    textAlign: { xs: 'center', sm: 'left' }, // Center on small screens, left on larger
    width: '100%', // Ensures it takes full width to allow space-between with logout button
  },
  logoutButton: {
    py: 1,
    px: 3,
    borderRadius: theme.shape.borderRadius,
    bgcolor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
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
    marginBottom: theme.spacing(3), // Clear separation from movie rows
  },
  resultsSection: {
    width: '100%',
    minHeight: '200px', // Maintain minimum height
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // <--- CHANGED: Allows movie cards to wrap to multiple rows
    justifyContent: 'center', // <--- ADDED: Centers cards horizontally in the grid
    // REMOVED: overflowX: 'auto', WebkitOverflowScrolling, and scrollbar styles
    // as these are for single-row horizontal scrolling, which is no longer desired.
    gap: theme.spacing(2.5), // <--- Adjusted for multi-row layout, provides good spacing
    width: '100%',
    paddingY: theme.spacing(1),
    // REMOVED: paddingX: theme.spacing(0.5) as it's less critical for wrapped layouts
    marginBottom: theme.spacing(4), // <--- Added: Spacing between the grid and pagination
  },
  movieCardWrapper: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  paginationContainer: {
    mt: theme.spacing(4), // Sufficient margin-top for clear separation from movie grid
    mb: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  }
});