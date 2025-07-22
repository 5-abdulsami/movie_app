// src/pages/Dashboard.tsx
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { PATH_LOGIN} from "../constants/appConstants";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Pagination,
  useTheme,
} from "@mui/material";
import { SxProps, Theme, darken } from "@mui/material/styles";

import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/movieService";
import { MovieSearchResult } from "../types";
import { FE_OMDB_DEFAULT_QUERY } from "../constants/appConstants";

const Dashboard: React.FC = () => {
  const { logout, user: currentUser, isLoading: authLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme<Theme>();

  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [movieFetchError, setMovieFetchError] = useState<string | null>(null);


  const [movieListParams, setMovieListParams] = useState({
    query: FE_OMDB_DEFAULT_QUERY,
    page: 1,
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_LOGIN);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchAndDisplayMovies = useCallback(async () => {
    const { query, page } = movieListParams;

    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      setMovieFetchError(null);
      return;
    }

    setLoadingMovies(true);
    setMovieFetchError(null);

    const { data, error } = await searchMovies(query, page);

    if (error) {
      setMovieFetchError(error);
      setMovies([]);
      setTotalResults(0);
    } else if (data) {
      setMovies(data.movies);
      setTotalResults(data.totalResults);
    }
    setLoadingMovies(false);
  }, [movieListParams]);

  useEffect(() => {
    fetchAndDisplayMovies();
  }, [fetchAndDisplayMovies]);

  const handleSearchSubmit = useCallback((newQuery: string) => {
    const queryToSet = newQuery.trim() === '' ? FE_OMDB_DEFAULT_QUERY : newQuery;

    setMovieListParams((prev) => ({
      ...prev,
      query: queryToSet,
      page: 1,
    }));
  }, []);

  const handlePaginationChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      setMovieListParams((prev) => ({
        ...prev,
        page: value,
      }));
    },
    []
  );

  const totalPages = Math.ceil(totalResults / 10);

  const styles: { [key: string]: SxProps<Theme> } = {
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
      gap: theme.spacing(3),
      width: '100%',
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
  };

  return (
    <Box sx={styles.rootContainer}>
      <Container component="main" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={styles.dashboardContent}>
          <Box sx={styles.headerBox}>
            <Typography component="h1" variant="h4" sx={styles.title}>
              Welcome, {currentUser?.name || "User"}!
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              disabled={authLoading}
              sx={styles.logoutButton}
            >
              {authLoading ? <CircularProgress size={24} color="inherit" /> : "Logout"}
            </Button>
          </Box>

          {authError && (
            <Alert severity="error" sx={styles.errorAlert}>
              {authError}
            </Alert>
          )}

          <Box sx={styles.searchSection}>
            <SearchBar
              onSearch={handleSearchSubmit}
              isLoading={loadingMovies}
            />
          </Box>

          <Box sx={styles.resultsSection}>
            {loadingMovies ? (
              <Box sx={styles.loadingIndicator}>
                <CircularProgress size={60} color="primary" />
                <Typography variant="h6" color="text.primary">Loading movies...</Typography>
              </Box>
            ) : movieFetchError ? (
              <Alert severity="error" sx={styles.errorAlert}>{movieFetchError}</Alert>
            ) : movies.length > 0 ? (
              <>
                <Box sx={styles.movieGrid}>
                  {movies.map((movie) => (
                    <Box key={movie.imdbID} sx={styles.movieCardWrapper}>
                      <MovieCard movie={movie} />
                    </Box>
                  ))}
                </Box>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Box sx={styles.paginationContainer}>
                    <Pagination
                      count={totalPages}
                      page={movieListParams.page}
                      onChange={handlePaginationChange}
                      color="primary"
                      siblingCount={1}
                      boundaryCount={1}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="h6" sx={styles.noResults}>
                {movieListParams.query && movieListParams.query !== FE_OMDB_DEFAULT_QUERY
                  ? `No movies found for "${movieListParams.query}". Try a different search!`
                  : `Search for movies or explore our default recommendations!`}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;