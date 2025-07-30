import { Request, Response } from 'express';
import axios from 'axios';
import { Types } from 'mongoose';
import User from '../models/User';
import {
    OMDB_API_BASE_URL,
    STATUS_OK,
    STATUS_BAD_REQUEST,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_UNAUTHORIZED,
    MESSAGE_SERVER_ERROR,
    MESSAGE_USER_NOT_FOUND,
    MESSAGE_AUTH_NO_TOKEN, 
    MESSAGE_OMDB_API_KEY_MISSING, 
    MESSAGE_SEARCH_QUERY_EMPTY, 
    MESSAGE_NO_MOVIES_FOUND, 
    MESSAGE_FAILED_FETCH_OMDB, 
    MESSAGE_IMDB_ID_REQUIRED, 
    MESSAGE_MOVIE_DETAILS_NOT_FOUND, 
    MESSAGE_INTERNAL_SERVER_FETCH_ERROR, 
    MESSAGE_ADD_FAVORITE_SUCCESS,
    MESSAGE_REMOVE_FAVORITE_SUCCESS
} from '../constants/apiConstants';

const OMDB_API_KEY = process.env.OMDB_API_KEY as string;

// Helper function to handle common user/auth checks
const getUserAndCheckAuth = async (req: Request & { user?: { id?: string } }, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(STATUS_UNAUTHORIZED).json({ message: MESSAGE_AUTH_NO_TOKEN }); 
        return null;
    }

    const user = await User.findById(userId);

    if (!user) {
        res.status(STATUS_NOT_FOUND).json({ message: MESSAGE_USER_NOT_FOUND }); 
        return null;
    }
    return user;
};

export const searchMovies = async (req: Request, res: Response) => {
    const { query, page } = req.query;

    if (!OMDB_API_KEY) {
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGE_OMDB_API_KEY_MISSING }); 
    }
    if (!query || typeof query !== 'string' || query.trim() === '') {
        return res.status(STATUS_BAD_REQUEST).json({ success: false, message: MESSAGE_SEARCH_QUERY_EMPTY }); 
    }

    const pageNum = parseInt(page as string, 10);
    const requestedPage = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;

    try {
        const omdbResponse = await axios.get(
            `${OMDB_API_BASE_URL}?s=${encodeURIComponent(query)}&page=${requestedPage}&apikey=${OMDB_API_KEY}`
        );
        const omdbData = omdbResponse.data;

        if (omdbData.Response === 'True') {
            return res.status(STATUS_OK).json({ 
                success: true,
                movies: omdbData.Search,
                totalResults: parseInt(omdbData.totalResults || '0', 10),
            });
        } else if (omdbData.Response === 'False' && omdbData.Error === 'Movie not found!') {
            return res.status(STATUS_OK).json({ 
                success: true,
                movies: [],
                totalResults: 0,
                message: MESSAGE_NO_MOVIES_FOUND, 
            });
        } else {
            return res.status(STATUS_BAD_REQUEST).json({ success: false, message: omdbData.Error || MESSAGE_FAILED_FETCH_OMDB }); 
        }
    } catch (error: any) {
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGE_INTERNAL_SERVER_FETCH_ERROR }); 
    }
};

export const getMovieDetails = async (req: Request, res: Response) => {
    const { imdbID } = req.params;

    if (!OMDB_API_KEY) {
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGE_OMDB_API_KEY_MISSING }); 
    }
    if (!imdbID || typeof imdbID !== 'string') {
        return res.status(STATUS_BAD_REQUEST).json({ success: false, message: MESSAGE_IMDB_ID_REQUIRED }); 
    }

    try {
        const omdbResponse = await axios.get(
            `${OMDB_API_BASE_URL}?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`
        );
        const omdbData = omdbResponse.data;

        if (omdbData.Response === 'True') {
            return res.status(STATUS_OK).json({ success: true, movie: omdbData }); 
        } else {
            return res.status(STATUS_NOT_FOUND).json({ success: false, message: omdbData.Error || MESSAGE_MOVIE_DETAILS_NOT_FOUND }); 
        }
    } catch (error: any) {
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGE_INTERNAL_SERVER_FETCH_ERROR }); 
    }
};

// Add a movie to favorites
export const addFavorite = async (req: Request, res: Response) => {
    const user = await getUserAndCheckAuth(req, res);
    if (!user) return;
    const { movieId } = req.params;
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }
    return res.status(200).json({ message: MESSAGE_ADD_FAVORITE_SUCCESS, favorites: user.favorites });
  };
  
  // Remove a movie from favorites
  export const removeFavorite = async (req: Request, res: Response) => {
    const user = await getUserAndCheckAuth(req, res);
    if (!user) return;
    const { movieId } = req.params;
    user.favorites = user.favorites.filter(favId => favId !== movieId);
    await user.save();
    return res.status(200).json({ message: MESSAGE_REMOVE_FAVORITE_SUCCESS, favorites: user.favorites });
  };

// Get all favorite movies for current user
export const getFavorites = async (req: Request, res: Response) => {
    try {
        const user = await getUserAndCheckAuth(req, res);
        if (!user) return;

        return res.status(STATUS_OK).json({ favorites: user.favorites }); 
    } catch (error) {
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MESSAGE_SERVER_ERROR }); 
    }
};