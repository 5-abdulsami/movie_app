import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, useTheme, IconButton } from '@mui/material';
import { SxProps, Theme, darken } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieSearchResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { PATH_MOVIE_DETAIL } from '../constants/appConstants';
import { addFavorite, removeFavorite } from '../services/movieService';

interface MovieCardProps {
  movie: MovieSearchResult;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  token: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, favorites, setFavorites, token }) => {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const isFavorite = favorites.includes(movie.imdbID);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking the heart
    if ((e.target as HTMLElement).closest('.favorite-btn')) return;
    navigate(PATH_MOVIE_DETAIL.replace(':imdbID', movie.imdbID));
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      const res = await removeFavorite(movie.imdbID, token);
      if (!res.error) setFavorites(res.data);
    } else {
      const res = await addFavorite(movie.imdbID, token);
      if (!res.error) setFavorites(res.data);
    }
  };

  const styles: { [key: string]: SxProps<Theme> } = {
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
  };

  return (
    <Card sx={styles.card} onClick={handleCardClick}>
      {movie.Poster && movie.Poster !== "N/A" ? (
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={styles.media}
        />
      ) : (
        <Box sx={styles.noPosterBox}>
          <Typography variant="body2">No Poster Available</Typography>
          <Typography variant="caption">{movie.Title}</Typography>
        </Box>
      )}
      <CardContent sx={styles.content}>
        <IconButton
          className="favorite-btn"
          sx={styles.favoriteBtn}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={styles.title}>
          {movie.Title}
        </Typography>
        <Typography variant="body2" sx={styles.year}>
          {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;