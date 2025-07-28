import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { PATH_LOGIN } from "../../constants/appConstants";
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

import SearchBar from "../SearchBar";
import MovieCard from "../MovieCard";
import { searchMovies, getFavorites } from "../../services/movieService";
import { MovieSearchResult } from "../../types";
import { FE_OMDB_DEFAULT_QUERY } from "../../constants/appConstants";
import { getDashboardStyles } from './styles';
import { MovieListParams } from './types';

const Dashboard: React.FC = () => {
  const { logout, user: currentUser, isLoading: authLoading, error: authError, token } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getDashboardStyles(theme);

  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [movieFetchError, setMovieFetchError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [movieListParams, setMovieListParams] = useState<MovieListParams>({
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

  useEffect(() => {
    const fetchFavorites = async () => {
      if (token) {
        const { data } = await getFavorites(token);
        if (data) setFavorites(data);
      }
    };
    fetchFavorites();
  }, [token]);

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
                      <MovieCard
                        movie={movie}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        token={token || ''}
                      />
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