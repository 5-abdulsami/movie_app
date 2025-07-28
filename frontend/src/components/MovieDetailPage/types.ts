import { SxProps, Theme } from '@mui/material/styles';

// This is likely from your MovieSearchResult or a separate API types file.
// Assuming it has all the fields from the OMDb API.
// If not, you might need to define it explicitly here or import from a central types file.
export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string; // "True" or "False"
  Error?: string; // If Response is "False"
}

export interface MovieDetailStyles {
  rootContainer: SxProps<Theme>;
  detailContentWrapper: SxProps<Theme>;
  backButton: SxProps<Theme>;
  centeredContainer: SxProps<Theme>;
  loadingText: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  posterBox: SxProps<Theme>;
  posterImage: SxProps<Theme>;
  noPosterPlaceholder: SxProps<Theme>;
  infoSection: SxProps<Theme>;
  title: SxProps<Theme>;
  subtitle: SxProps<Theme>;
  detailItem: SxProps<Theme>;
  detailLabel: SxProps<Theme>;
  detailValue: SxProps<Theme>;
  genreChipsContainer: SxProps<Theme>;
  genreChip: SxProps<Theme>; // Added this for the Chip component style
  plotText: SxProps<Theme>;
}