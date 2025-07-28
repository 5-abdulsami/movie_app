import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../services/movieService";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PATH_DASHBOARD } from "../../constants/appConstants";

import { getMovieDetailStyles } from './styles';
import { MovieDetail, MovieDetailStyles } from './types'; // Import types

const MovieDetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles: MovieDetailStyles = getMovieDetailStyles(theme); // Explicitly type styles

  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!imdbID) {
        setError("Movie ID is missing from URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMovieDetails(null);

      const { data, error: fetchError } = await getMovieDetails(imdbID);

      if (fetchError) {
        setError(fetchError);
      } else if (data) {
        setMovieDetails({ ...data, Response: "True" });
      }
      setLoading(false);
    };

    fetchDetails();
  }, [imdbID]);

  const handleBackToDashboard = () => {
    navigate(PATH_DASHBOARD);
  };

  const renderDetailItem = (label: string, value: string | undefined) => {
    if (!value || value === "N/A" || value.trim() === "") {
      return null;
    }
    return (
      <Typography variant="body1" sx={styles.detailItem}>
        <span style={styles.detailLabel as React.CSSProperties}>{label}:</span>
        <span style={styles.detailValue as React.CSSProperties}>{value}</span>
      </Typography>
    );
  };

  if (loading) {
    return (
      <Box sx={styles.centeredContainer}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={styles.loadingText}>
          Loading movie details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.centeredContainer}>
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={handleBackToDashboard}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, ...styles.backButton, alignSelf: "center" }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  if (!movieDetails) {
    return (
      <Box sx={styles.centeredContainer}>
        <Typography variant="h6" color="text.secondary">
          Movie details not found.
        </Typography>
        <Button
          variant="contained"
          onClick={handleBackToDashboard}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, ...styles.backButton, alignSelf: "center" }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Container component="main" sx={styles.rootContainer}>
      <Button
        variant="contained"
        onClick={handleBackToDashboard}
        startIcon={<ArrowBackIcon />}
        sx={styles.backButton}
      >
        Back to Dashboard
      </Button>

      <Box sx={styles.detailContentWrapper}>
        {/* Poster Section */}
        <Box sx={styles.posterBox}>
          {movieDetails.Poster && movieDetails.Poster !== "N/A" ? (
            <Box
              component="img"
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              sx={styles.posterImage}
            />
          ) : (
            <Box sx={styles.noPosterPlaceholder}>
              <Typography variant="body2">No Poster Available</Typography>
              <Typography variant="caption">{movieDetails.Title}</Typography>
            </Box>
          )}
        </Box>

        {/* Details Section */}
        <Box sx={styles.infoSection}>
          <Typography variant="h4" component="h1" sx={styles.title}>
            {movieDetails.Title}
          </Typography>
          <Typography variant="h6" component="p" sx={styles.subtitle}>
            {movieDetails.Year}
            {movieDetails.Rated &&
              movieDetails.Rated !== "N/A" &&
              ` | Rated: ${movieDetails.Rated}`}
            {movieDetails.Runtime &&
              movieDetails.Runtime !== "N/A" &&
              ` | ${movieDetails.Runtime}`}
          </Typography>

          {movieDetails.Genre && movieDetails.Genre !== "N/A" && (
            <Box
              sx={{
                ...styles.detailItem,
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={styles.detailLabel}
                component="span"
              >
                Genre:
              </Typography>
              <Box sx={styles.genreChipsContainer}>
                {movieDetails.Genre.split(", ").map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    sx={styles.genreChip} // This was `styles.genreChip` in original `styles` object, needs to be defined
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {renderDetailItem("Director", movieDetails.Director)}
          {renderDetailItem("Actors", movieDetails.Actors)}
          {renderDetailItem("Released", movieDetails.Released)}
          {renderDetailItem("Country", movieDetails.Country)}
          {renderDetailItem("Language", movieDetails.Language)}
          {renderDetailItem("IMDb Rating", movieDetails.imdbRating)}
          {renderDetailItem("Metascore", movieDetails.Metascore)}
          {renderDetailItem("Awards", movieDetails.Awards)}
          {renderDetailItem("Box Office", movieDetails.BoxOffice)}
          {renderDetailItem("Production", movieDetails.Production)}
          {renderDetailItem("Website", movieDetails.Website)}

          {movieDetails.Plot && movieDetails.Plot !== "N/A" && (
            <Typography variant="body1" sx={styles.plotText}>
              {movieDetails.Plot}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetailPage;