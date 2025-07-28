import { SxProps, Theme } from '@mui/material/styles';
import { MovieSearchResult } from '../../types';

export interface MovieCardProps {
  movie: MovieSearchResult;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  token: string;
}

export interface MovieCardStyles {
  card: SxProps<Theme>;
  media: SxProps<Theme>;
  content: SxProps<Theme>;
  favoriteBtn: SxProps<Theme>;
  title: SxProps<Theme>;
  year: SxProps<Theme>;
  noPosterBox: SxProps<Theme>;
} 