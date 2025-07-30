// Frontend-specific Messages
export const FE_LOGIN_SUCCESS = "Logged in successfully!";
export const FE_REGISTER_SUCCESS = "Registered successfully!";
export const FE_LOGOUT_SUCCESS = "Logged out successfully!";
export const FE_LOGIN_FAILED = "Login failed. Please check your credentials.";
export const FE_REGISTER_FAILED = "Registration failed. Please try again.";
export const FE_FETCH_USER_FAILED = "Failed to fetch user data.";

// App Details Constants
export const APP_NAME = "StreamFlix";
export const APP_DESCRIPTION = "Discover and manage your favorite movies with personalized recommendations.";

// Local Storage Keys
export const LS_AUTH_TOKEN = "token";
export const LS_USER_DATA = "user";

// API Endpoints
export const API_AUTH_REGISTER = "/auth/register";
export const API_AUTH_LOGIN = "/auth/login";
export const API_AUTH_ME = "/auth/me";
export const API_AUTH_LOGOUT = "/auth/logout";

// Frontend Route Paths
export const PATH_LOGIN = "/login";
export const PATH_HOME = "/";
export const PATH_REGISTER = "/register";
export const PATH_DASHBOARD = "/dashboard";
export const PATH_FAVORITES = "/favorites";
export const PATH_MOVIE_DETAIL = "/movie/:imdbID";
export const PATH_PROFILE = "/profile";

// Frontend Form Validation Messages
export const VALIDATION_EMAIL_REQUIRED = "Email is required";
export const VALIDATION_EMAIL_INVALID = "Email is invalid";
export const VALIDATION_PASSWORD_REQUIRED = "Password is required";
export const VALIDATION_NAME_REQUIRED = "Name is required";
export const VALIDATION_NAME_MIN_LENGTH = "Name must be at least 2 characters";
export const VALIDATION_PASSWORD_MIN_LENGTH = "Password must be at least 6 characters";
export const VALIDATION_CONFIRM_PASSWORD_REQUIRED = "Please confirm your password";
export const VALIDATION_PASSWORDS_DO_NOT_MATCH = "Passwords do not match";

// OMDB API Constants
export const FE_OMDB_FETCH_FAILED = "Failed to fetch movie data from OMDb. Please try again later.";
export const FE_OMDB_NO_RESULTS = "No movies found matching your search.";
export const FE_OMDB_DEFAULT_QUERY = "batman";

// Movie Constants  
export const FE_MOVIE_ID_REQUIRED = "Movie ID is required.";
export const FE_BACKEND_COMM_ERROR = " (Backend communication error).";
export const FE_NETWORK_ERROR = " (Network error or Backend unreachable).";
export const FE_FETCH_FAVORITES_FAILED = "Failed to fetch favorites.";
export const FE_ADD_FAVORITE_FAILED = "Failed to add favorite.";
export const FE_REMOVE_FAVORITE_FAILED = "Failed to remove favorite.";

// Navigation Labels
export const LABEL_DASHBOARD = "Dashboard";
export const LABEL_FAVORITES = "Favorites";
export const LABEL_PROFILE = "My Profile";