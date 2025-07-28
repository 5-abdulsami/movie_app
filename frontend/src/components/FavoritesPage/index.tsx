import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert, useTheme, Container } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { getFavoriteMoviesDetails, removeFavorite } from "../../services/movieService";
import MovieCard from "../MovieCard";
import { MovieSearchResult } from "../../types";
import { useNavigate } from "react-router-dom";
import { getFavoritesPageStyles } from './styles';

const FavoritesPage: React.FC = () => {
  const { token } = useAuth();
  const theme = useTheme();
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const styles = getFavoritesPageStyles(theme);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getFavoriteMoviesDetails(token || "");
        if (res.error) throw new Error(res.error);
        setMovies(res.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [token]);

  // Remove a movie from favorites and update the list
  const handleRemoveFavorite = async (imdbID: string) => {
    if (!token) return;
    const res = await removeFavorite(imdbID, token);
    if (!res.error) {
      setMovies((prev) => prev.filter((m) => m.imdbID !== imdbID));
    }
  };

  const handleCardClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: theme.palette.primary.light,textAlign: 'center' }}>
          My Favorite Movies
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <CircularProgress size={60} color="primary" />
            <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
              Loading favorites...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : movies.length > 0 ? (
          <Box sx={styles.movieGrid}>
            {movies.map((movie) => (
              <Box key={movie.imdbID} sx={styles.movieCardWrapper}>
                <div style={{ width: '100%' }} onClick={() => handleCardClick(movie.imdbID)}>
                  <MovieCard
                    movie={movie}
                    favorites={movies && movies.map(m => m.imdbID)}
                    setFavorites={(favIDs) => handleRemoveFavorite(movie.imdbID)}
                    token={token || ""}
                  />
                </div>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h6" sx={styles.noResults}>
            You have no favorite movies yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage; 