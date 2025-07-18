export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  user?: User
  token?: string
  errors?: any[]
}

// --- OMDB API Types ---

// Represents a single rating from IMDB
export interface Rating {
  Source: string
  Value: string
}

// A single movie object returned in a search result list
export interface MovieSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

// The full detailed response for a single movie lookup by ID
export interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}

// Represents the structure of the OMDB API search response (for '?s=' calls)
export interface OmdbSearchResponse {
  Search?: MovieSearchResult[]
  totalResults?: string
  Response: "True" | "False"
  Error?: string
}

// Represents the full OMDB API detail response (for '?i=' calls),
// which includes movie details plus the API response status
export interface OmdbDetailResponse extends MovieDetail {
  Response: "True" | "False"
  Error?: string
}