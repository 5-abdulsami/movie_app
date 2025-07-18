// Frontend-specific Messages
export const FE_LOGIN_SUCCESS = "Logged in successfully!";
export const FE_REGISTER_SUCCESS = "Registered successfully!";
export const FE_LOGOUT_SUCCESS = "Logged out successfully!";
export const FE_LOGIN_FAILED = "Login failed. Please check your credentials.";
export const FE_REGISTER_FAILED = "Registration failed. Please try again.";
export const FE_FETCH_USER_FAILED = "Failed to fetch user data.";

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
export const PATH_REGISTER = "/register";
export const PATH_DASHBOARD = "/dashboard";
export const PATH_HOME = "/";

// Frontend Form Validation Messages
export const VALIDATION_EMAIL_REQUIRED = "Email is required";
export const VALIDATION_EMAIL_INVALID = "Email is invalid";
export const VALIDATION_PASSWORD_REQUIRED = "Password is required";
export const VALIDATION_NAME_REQUIRED = "Name is required";
export const VALIDATION_NAME_MIN_LENGTH = "Name must be at least 2 characters";
export const VALIDATION_PASSWORD_MIN_LENGTH = "Password must be at least 6 characters";
export const VALIDATION_CONFIRM_PASSWORD_REQUIRED = "Please confirm your password";
export const VALIDATION_PASSWORDS_DO_NOT_MATCH = "Passwords do not match";

// OMDB API
export const OMDB_API_BASE_URL = "http://www.omdbapi.com/";
export const FE_OMDB_FETCH_FAILED = "Failed to fetch movie data from OMDb. Please try again later.";
export const FE_OMDB_NO_RESULTS = "No movies found matching your search.";