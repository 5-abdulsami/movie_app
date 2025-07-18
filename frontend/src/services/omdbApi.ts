import {
  OMDB_API_BASE_URL,
  FE_OMDB_FETCH_FAILED,
  FE_OMDB_NO_RESULTS,
} from "../constants/appConstants";

// Import types from src/types/index.ts
import {
  MovieDetail,
  OmdbSearchResponse,
  OmdbDetailResponse,
} from "../types";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Search movies by title from OMDb API
export const searchMovies = async (query: string, page: number = 1) => {
  if (!OMDB_API_KEY) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (API Key missing)." };
  }
  if (!query.trim()) {
    // If query is empty, return empty results, not an error
    return { data: { movies: [], totalResults: 0 }, error: null };
  }

  try {
    const response = await fetch(
      `${OMDB_API_BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${OMDB_API_KEY}`
    );
    const result: OmdbSearchResponse = await response.json();

    if (result.Response === "True" && result.Search) {
      return { data: { movies: result.Search, totalResults: parseInt(result.totalResults || "0", 10) }, error: null };
    } else if (result.Response === "False" && result.Error === "Movie not found!") {
      return { data: { movies: [], totalResults: 0 }, error: FE_OMDB_NO_RESULTS };
    } else {
      return { data: null, error: result.Error || FE_OMDB_FETCH_FAILED };
    }
  } catch (err) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (Network error)." };
  }
};

// Get movie details by IMDb ID from OMDb API
export const getMovieDetails = async (imdbID: string) => {
  if (!OMDB_API_KEY) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (API Key missing)." };
  }
  if (!imdbID) {
    return { data: null, error: "Movie ID is required." };
  }

  try {
    const response = await fetch(
      `${OMDB_API_BASE_URL}?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`
    );
    const result: OmdbDetailResponse = await response.json();

    if (result.Response === "True") {
      return { data: result as MovieDetail, error: null };
    } else {
      return { data: null, error: result.Error || FE_OMDB_FETCH_FAILED };
    }
  } catch (err) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + " (Network error)." };
  }
};