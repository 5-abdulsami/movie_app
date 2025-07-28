import { SxProps, Theme, darken } from '@mui/material/styles';
import { MovieCardStyles } from './types';

export const getMovieCardStyles = (theme: Theme, isFavorite: boolean): MovieCardStyles => ({
  card: {
    width: 300,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: theme.palette.background.paper, 
    borderRadius: theme.shape.borderRadius, 
    boxShadow: `0 6px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${theme.palette.glow.main}20`, 
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    overflow: 'hidden', 
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
    height: 300, 
    width: '100%',
    objectFit: 'cover',
  },
  content: {
    flexGrow: 1,
    p: 2,
    textAlign: 'left',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    color: isFavorite ? theme.palette.error.main : theme.palette.action.disabled,
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 1.3,
    mb: 0.5,
    color: theme.palette.primary.light, 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '1.1rem',
  },
  year: {
    color: theme.palette.text.secondary, 
    fontSize: '1rem',
    mt: 1,
  },
  noPosterBox: {
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: darken(theme.palette.background.paper, 0.2), 
    color: theme.palette.text.disabled,
    textAlign: 'center',
    p: 2,
    '& .MuiTypography-root': {
      fontWeight: 600,
      opacity: 0.7,
    }
  },
}); 