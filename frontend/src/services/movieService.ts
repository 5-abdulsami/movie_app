import {
  FE_OMDB_FETCH_FAILED,
  FE_OMDB_NO_RESULTS,
} from "../constants/appConstants";

import {
  MovieDetail, // Keep MovieDetail if your frontend fetches single movie details
} from "../types";

// Use your backend API URL
const BACKEND_API_URL = process.env.REACT_APP_API_URL;

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query.trim()) {
    return { data: { movies: [], totalResults: 0 }, error: null };
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    const result = await response.json(); // This is the response from YOUR backend

    if (response.ok && result.success) {
      return {
        data: {
          movies: result.movies,
          totalResults: parseInt(result.totalResults || "0", 10)
        },
        error: null
      };
    } else {
      if (result.message === 'No movies found for your search.') {
        return { data: { movies: [], totalResults: 0 }, error: FE_OMDB_NO_RESULTS };
      }
      return { data: null, error: result.message || FE_OMDB_FETCH_FAILED + " (Backend communication error)." };
    }
  } catch (err: any) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (Network error or Backend unreachable)." };
  }
};

// If you have getMovieDetails, modify it similarly to call your backend
export const getMovieDetails = async (imdbID: string) => {
  if (!imdbID) {
    return { data: null, error: "Movie ID is required." };
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/movies/details/${encodeURIComponent(imdbID)}`
    );
    const result = await response.json();

    if (response.ok && result.success) {
      return { data: result.movie as MovieDetail, error: null };
    } else {
      return { data: null, error: result.message || FE_OMDB_FETCH_FAILED + " (Backend communication error)." };
    }
  } catch (err: any) {
    console.error("Frontend: Error calling backend movie details endpoint:", err);
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (Network error or Backend unreachable)." };
  }
};