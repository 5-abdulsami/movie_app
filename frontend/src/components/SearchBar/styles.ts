import { SxProps, Theme, darken } from '@mui/material/styles';
import { SearchBarStyles } from './types';

export const getSearchBarStyles = (theme: Theme): SearchBarStyles => ({
  searchBox: {
    width: "100%",
    maxWidth: 700,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: darken(theme.palette.background.paper, 0.08),
      borderRadius: 8,
      "& fieldset": {
        borderColor: theme.palette.grey[700],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[500],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}40`,
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 18px",
      color: theme.palette.text.primary,
    },
    "& .MuiInputAdornment-root": {
      color: theme.palette.text.secondary,
    },
  },
  iconButton: {
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}); 