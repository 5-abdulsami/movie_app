import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import { MovieDetail } from "../types";
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
import { SxProps, Theme, lighten, darken } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PATH_DASHBOARD } from "../constants/appConstants";

const MovieDetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const theme = useTheme<Theme>();

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
        setMovieDetails(data);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [imdbID]);

  const handleBackToDashboard = () => {
    navigate(PATH_DASHBOARD);
  };

  const styles: { [key: string]: SxProps<Theme> } = {
    rootContainer: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 4 },
      background: theme.palette.gradients.darkPrimary,
      color: theme.palette.text.primary,
      overflow: "hidden",
      position: "relative",
    },
    detailContentWrapper: {
      width: "100%",
      maxWidth: 1200,
      p: { xs: 3, sm: 5, md: 6 },
      borderRadius: theme.shape.borderRadius,
      bgcolor: "rgba(0, 0, 0, 0.4)",
      boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${theme.palette.primary.main}20`,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: 4, md: 6 },
      alignItems: { xs: "center", md: "flex-start" },
    },
    backButton: {
      mb: 4,
      alignSelf: "flex-start",
      borderRadius: theme.shape.borderRadius,
      fontWeight: theme.typography.button.fontWeight,
      padding: "10px 20px",
      fontSize: "0.9rem",
      background: theme.palette.gradients.redButton,
      color: theme.palette.primary.contrastText,
      boxShadow: `0 6px 15px ${theme.palette.primary.main}40`,
      transition:
        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
      "&:hover": {
        background: theme.palette.gradients.redButton,
        filter: "brightness(1.1)",
        boxShadow: `0 8px 20px ${theme.palette.primary.main}60`,
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    },
    centeredContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100%",
      p: { xs: 2, sm: 3 },
      color: theme.palette.text.primary,
      background: theme.palette.gradients.darkPrimary,
    },
    loadingText: {
      mt: 2,
      color: theme.palette.text.primary,
    },
    errorAlert: {
      width: "80%",
      maxWidth: 600,
      boxShadow: theme.shadows[2],
    },
    posterBox: {
      flexShrink: 0,
      width: { xs: "80%", sm: "60%", md: 380 },
      height: { xs: "auto", md: 650 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0 10px 30px rgba(0,0,0,0.9), 0 0 25px ${theme.palette.glow.main}60`,
      overflow: "hidden",
      border: `2px solid ${theme.palette.primary.dark}`,
    },
    posterImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: theme.shape.borderRadius,
    },
    noPosterPlaceholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: darken(theme.palette.background.paper, 0.2),
      color: theme.palette.text.disabled,
      textAlign: "center",
      p: 3,
      borderRadius: theme.shape.borderRadius,
      fontSize: { xs: "0.9rem", sm: "1rem" },
      "& .MuiTypography-root": {
        fontWeight: 600,
        opacity: 0.7,
      },
    },
    infoSection: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
    },
    title: {
      fontWeight: 700,
      lineHeight: 1.2,
      mb: 1.5,
      color: theme.palette.primary.contrastText,
      textShadow: `0 0 10px ${theme.palette.glow.main}, 0 0 20px ${lighten(
        theme.palette.glow.main,
        0.5
      )}`,
      fontSize: { xs: "2rem", sm: "3rem", md: "3.8rem" },
      "&:hover": {
        color: theme.palette.primary.light,
        textShadow: `0 0 0px ${theme.palette.glow.main}100, 0 0 0px ${theme.palette.glow.main}0`,
      },
    },
    subtitle: {
      color: theme.palette.text.secondary,
      fontSize: { xs: "1rem", sm: "1.2rem" },
      mb: 2,
      fontWeight: 500,
    },
    detailItem: {
      mb: 1,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: { xs: "center", md: "flex-start" },
      alignItems: "center",
      gap: 1,
      fontSize: { xs: "0.95rem", sm: "1.05rem" },
      width: "100%",
    },
    detailLabel: {
      fontWeight: "bold",
      color: theme.palette.primary.light,
      mr: 0.5,
      whiteSpace: "nowrap",
    },
    detailValue: {
      color: theme.palette.text.secondary,
    },
    genreChipsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
      mt: 0.5,
      justifyContent: { xs: "center", md: "flex-start" },
    },
    plotText: {
      mt: 3,
      lineHeight: 1.7,
      color: theme.palette.text.primary,
      fontSize: { xs: "0.95rem", sm: "1.05rem" },
      textAlign: { xs: "center", md: "left" },
      maxWidth: "100%",
    },
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
                    sx={styles.genreChip}
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
