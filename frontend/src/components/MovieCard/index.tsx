import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, useTheme, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { PATH_MOVIE_DETAIL } from '../../constants/appConstants';
import { addFavorite, removeFavorite } from '../../services/movieService';
import { MovieCardProps } from './types';
import { getMovieCardStyles } from './styles';

const MovieCard: React.FC<MovieCardProps> = ({ movie, favorites, setFavorites, token }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isFavorite = favorites.includes(movie.imdbID);
  const styles = getMovieCardStyles(theme, isFavorite);

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