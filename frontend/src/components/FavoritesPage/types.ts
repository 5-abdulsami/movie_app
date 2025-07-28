import { SxProps, Theme } from '@mui/material/styles';
import { MovieSearchResult } from '../../types';

export interface FavoritesPageStyles {
  root: SxProps<Theme>;
  movieGrid: SxProps<Theme>;
  movieCardWrapper: SxProps<Theme>;
  noResults: SxProps<Theme>;
}

export interface FavoritesPageState {
  movies: MovieSearchResult[];
  loading: boolean;
  error: string | null;
} 