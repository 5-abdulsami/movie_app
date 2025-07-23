// Constants for API responses
export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_ACCEPTED = 202;
export const STATUS_NO_CONTENT = 204;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const STATUS_SERVICE_UNAVAILABLE = 503;

// Messages for API responses
export const MESSAGE_USER_EXISTS = "User already exists with this email";
export const MESSAGE_USER_REGISTERED = "User registered successfully";
export const MESSAGE_INVALID_CREDENTIALS = "Invalid credentials";
export const MESSAGE_AUTH_NO_TOKEN = "Not authorized, no token";
export const MESSAGE_AUTH_TOKEN_FAILED = "Not authorized, token failed";
export const MESSAGE_USER_LOGGED_OUT = "User logged out successfully";
export const MESSAGE_USER_NOT_FOUND = "User not found";
export const MESSAGE_SERVER_ERROR = "Server Error";
export const MESSAGE_NO_USER_WITH_TOKEN = "No user found with this token";
export const MESSAGE_LOGIN_SUCCESS = "Login successful";
export const MESSAGE_VALIDATION_FAILED = "Validation failed";

// Validation messages for routes
export const MESSAGE_VALIDATION_NAME_LENGTH = "Name must be between 2 and 50 characters";
export const MESSAGE_VALIDATION_INVALID_EMAIL = "Please provide a valid email";
export const MESSAGE_VALIDATION_PASSWORD_MIN_LENGTH = "Password must be at least 6 characters long";
export const MESSAGE_VALIDATION_PASSWORD_REQUIRED = "Password is required";

// Validation messages for Mongoose schema
export const MESSAGE_USER_NAME_REQUIRED = "Please provide a name";
export const MESSAGE_USER_NAME_MAX_LENGTH = "Name cannot be more than 50 characters";
export const MESSAGE_USER_EMAIL_REQUIRED = "Please provide an email";
export const MESSAGE_USER_EMAIL_VALID = "Please provide a valid email";
export const MESSAGE_USER_PASSWORD_REQUIRED = "Please provide a password";
export const MESSAGE_USER_PASSWORD_MIN_LENGTH = "Password must be at least 6 characters";

// API Endpoints for Backend Routes
export const API_AUTH_REGISTER = "/auth/register";
export const API_AUTH_LOGIN = "/auth/login";
export const API_AUTH_ME = "/auth/me";
export const API_AUTH_LOGOUT = "/auth/logout";

// Path Endpoints
export const PATH_REGISTER = "/register";
export const PATH_LOGIN = "/login";
export const PATH_ME = "/me";
export const PATH_LOGOUT = "/logout";


// Constants for server.ts
export const MESSAGE_SERVER_HEALTH_OK = "Server is running!";
export const MESSAGE_SOMETHING_WENT_WRONG = "Something went wrong!";
export const MESSAGE_ROUTE_NOT_FOUND = "Route not found";

// OMDB API Constants
export const OMDB_API_BASE_URL = "http://www.omdbapi.com/";
export const MESSAGE_OMDB_API_KEY_MISSING = "Server OMDb API Key is missing.";
export const MESSAGE_SEARCH_QUERY_EMPTY = "Search query cannot be empty.";

// Movie Constants
export const MESSAGE_NO_MOVIES_FOUND = "No movies found for your search.";
export const MESSAGE_FAILED_FETCH_OMDB = "Failed to fetch movies from OMDb.";
export const MESSAGE_IMDB_ID_REQUIRED = "Movie IMDb ID is required.";
export const MESSAGE_MOVIE_DETAILS_NOT_FOUND = "Movie details not found.";
export const MESSAGE_INTERNAL_SERVER_FETCH_ERROR = "Internal server error while fetching movie data.";

// Favorites Constants
export const MESSAGE_ADD_FAVORITE_SUCCESS = "Added to favorites";
export const MESSAGE_REMOVE_FAVORITE_SUCCESS = "Removed from favorites";
export const MESSAGE_GET_FAVORITES_SUCCESS = "Favorites fetched successfully";
export const MESSAGE_ADD_FAVORITE_FAILED = "Failed to add favorite";
export const MESSAGE_REMOVE_FAVORITE_FAILED = "Failed to remove favorite";
export const MESSAGE_GET_FAVORITES_FAILED = "Failed to fetch favorites";