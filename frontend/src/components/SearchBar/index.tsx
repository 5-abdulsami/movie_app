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
import { SearchBarProps } from './types';
import { getSearchBarStyles } from './styles';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const theme = useTheme();
  const styles = getSearchBarStyles(theme);

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