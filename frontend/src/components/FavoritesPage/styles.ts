import { SxProps, Theme } from '@mui/material/styles';
import { FavoritesPageStyles } from './types';

export const getFavoritesPageStyles = (theme: Theme): FavoritesPageStyles => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: { xs: 4, sm: 6, md: 12 },
    px: { xs: 2, sm: 3, md: 4 },
    background: theme.palette.gradients.darkPrimary,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    position: "relative",
    color: theme.palette.text.primary,
  },
  movieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    justifyContent: "center",
    gap: theme.spacing(9),
    width: "100%",
    alignItems: "center",
    justifyItems: "center",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  movieCardWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  noResults: {
    color: theme.palette.text.secondary,
    mt: 4,
    textAlign: "center",
    lineHeight: 1.5,
  },
}); 