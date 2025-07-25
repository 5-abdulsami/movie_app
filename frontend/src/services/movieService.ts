import {
  FE_OMDB_FETCH_FAILED,
  FE_OMDB_NO_RESULTS,
  FE_MOVIE_ID_REQUIRED,
  FE_BACKEND_COMM_ERROR,
  FE_NETWORK_ERROR,
  FE_FETCH_FAVORITES_FAILED,
  FE_ADD_FAVORITE_FAILED,
  FE_REMOVE_FAVORITE_FAILED,
} from "../constants/appConstants";

import { MovieDetail } from "../types";

const BACKEND_API_URL = process.env.REACT_APP_API_URL;

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query.trim()) {
    return { data: { movies: [], totalResults: 0 }, error: null };
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    const result = await response.json(); // the response from backend

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
      return { data: null, error: result.message || FE_OMDB_FETCH_FAILED + FE_BACKEND_COMM_ERROR };
    }
  } catch (err: any) {
    return { data: null, error: FE_OMDB_FETCH_FAILED + FE_NETWORK_ERROR };
  }
};

export const getMovieDetails = async (imdbID: string) => {
  if (!imdbID) {
    return { data: null, error: FE_MOVIE_ID_REQUIRED };
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/movies/details/${encodeURIComponent(imdbID)}`
    );
    const result = await response.json();

    if (response.ok && result.success) {
      return { data: result.movie as MovieDetail, error: null };
    } else {
      return { data: null, error: result.message || FE_OMDB_FETCH_FAILED + FE_BACKEND_COMM_ERROR };
    }
  } catch (err: any) {
    console.error("Frontend: Error calling backend movie details endpoint:", err);
    return { data: null, error: FE_OMDB_FETCH_FAILED + FE_NETWORK_ERROR };
  }
};

export const getFavorites = async (token: string) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/movies/users/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return { data: result.favorites, error: null };
    } else {
      return { data: null, error: result.message || FE_FETCH_FAVORITES_FAILED };
    }
  } catch (err: any) {
    return { data: null, error: FE_FETCH_FAVORITES_FAILED };
  }
};

export const addFavorite = async (movieId: string, token: string) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/movies/users/favorites/${movieId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return { data: result.favorites, error: null };
    } else {
      return { data: null, error: result.message || FE_ADD_FAVORITE_FAILED };
    }
  } catch (err: any) {
    return { data: null, error: FE_ADD_FAVORITE_FAILED };
  }
};

export const removeFavorite = async (movieId: string, token: string) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/movies/users/favorites/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return { data: result.favorites, error: null };
    } else {
      return { data: null, error: result.message || FE_REMOVE_FAVORITE_FAILED };
    }
  } catch (err: any) {
    return { data: null, error: FE_REMOVE_FAVORITE_FAILED };
  }
};

export const getFavoriteMoviesDetails = async (token: string) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/movies/users/favorites/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return { data: result.movies, error: null };
    } else {
      return { data: null, error: result.message || FE_FETCH_FAVORITES_FAILED };
    }
  } catch (err: any) {
    return { data: null, error: FE_FETCH_FAVORITES_FAILED };
  }
};