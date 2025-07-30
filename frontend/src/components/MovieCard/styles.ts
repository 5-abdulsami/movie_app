import { SxProps, Theme, darken } from '@mui/material/styles';
import { MovieCardStyles } from './types';

export const getMovieCardStyles = (theme: Theme, isFavorite: boolean): MovieCardStyles => ({
  card: {
    width: 250,
    height: 370,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 6px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${theme.palette.glow.main}20`,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative', // ADDED: Set card as the positioning context for absolute children
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 12px 25px rgba(0, 0, 0, 0.8), 0 0 20px ${theme.palette.glow.main}50`,
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: `0 4px 10px rgba(0, 0, 0, 0.6), 0 0 8px ${theme.palette.glow.main}30`,
    },
  },
  media: {
    height: 250,
    width: '100%',
    objectFit: 'cover',
  },
  content: {
    flexGrow: 1,
    p: 2, // Keep original padding for content
    textAlign: 'left',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // position: 'relative', // REMOVED: Not needed here as card is the parent
    // paddingTop: theme.spacing(3.5), // REMOVED: No longer needed to make space for icon
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    color: isFavorite ? theme.palette.error.main : theme.palette.action.disabled,
    fontSize: '1.5rem', // Adjusted size for better visibility over poster
    // Add a slight background for better contrast on varying poster colors
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '50%', // Make it circular
    p: theme.spacing(0.5), // Add some padding around the icon
    display: 'flex', // Use flex to center the icon within its circular background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'normal', // Retaining your value
    lineHeight: 1.3,      // Retaining your value
    mb: 0.5,              // Retaining your value
    color: theme.palette.primary.light,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.85rem', // Retaining your value
  },
  year: {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem', // Retaining your value
    mt: 1,                // Retaining your value
  },
  noPosterBox: {
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: darken(theme.palette.background.paper, 0.2),
    color: theme.palette.text.disabled,
    textAlign: 'center',
    p: 2,
    '& .MuiTypography-root': {
      fontWeight: 400,
      opacity: 0.7,
    }
  },
});