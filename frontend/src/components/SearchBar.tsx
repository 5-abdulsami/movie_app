import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { SxProps, Theme, darken } from "@mui/material/styles";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const theme = useTheme<Theme>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const styles: { [key: string]: SxProps<Theme> } = {
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
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.searchBox}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
        disabled={isLoading}
        sx={styles.textField}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  type="submit"
                  sx={styles.iconButton}
                  disabled={isLoading}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isLoading ? (
                  <CircularProgress size={20} color="primary" />
                ) : (
                  query && (
                    <IconButton
                      onClick={handleClear}
                      edge="end"
                      sx={styles.iconButton}
                    >
                      <ClearIcon />
                    </IconButton>
                  )
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
