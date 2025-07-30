import { SxProps, Theme } from '@mui/material/styles';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

export interface SearchBarStyles {
  searchBox: SxProps<Theme>;
  textField: SxProps<Theme>;
  iconButton: SxProps<Theme>;
} 