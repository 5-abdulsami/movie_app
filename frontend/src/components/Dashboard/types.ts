import { SxProps, Theme } from '@mui/material/styles';
import { MovieSearchResult } from '../../types';

export interface DashboardStyles {
  rootContainer: SxProps<Theme>;
  dashboardContent: SxProps<Theme>;
  headerBox: SxProps<Theme>;
  title: SxProps<Theme>;
  logoutButton: SxProps<Theme>;
  searchSection: SxProps<Theme>;
  resultsSection: SxProps<Theme>;
  loadingIndicator: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  noResults: SxProps<Theme>;
  movieGrid: SxProps<Theme>;
  movieCardWrapper: SxProps<Theme>;
  paginationContainer: SxProps<Theme>;
}

export interface MovieListParams {
  query: string;
  page: number;
}

export interface DashboardState {
  movies: MovieSearchResult[];
  totalResults: number;
  loadingMovies: boolean;
  movieFetchError: string | null;
  favorites: string[];
  movieListParams: MovieListParams;
} 