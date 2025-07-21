import { Request, Response } from 'express';
import axios from 'axios';
import { OMDB_API_BASE_URL } from '../constants/apiConstants';
const OMDB_API_KEY = process.env.OMDB_API_KEY as string;

if (!OMDB_API_KEY) {
    console.error('SERVER ERROR: OMDB_API_KEY is not defined in backend environment variables.');
}

export const searchMovies = async (req: Request, res: Response) => {
    const { query, page } = req.query;

    if (!OMDB_API_KEY) {
        return res.status(500).json({ success: false, message: 'Server OMDb API Key is missing.' });
    }
    if (!query || typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ success: false, message: 'Search query cannot be empty.' });
    }

    const pageNum = parseInt(page as string, 10);
    const requestedPage = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum; // Default to 1 if not a valid number

    try {
        const omdbResponse = await axios.get(
            `${OMDB_API_BASE_URL}?s=${encodeURIComponent(query)}&page=${requestedPage}&apikey=${OMDB_API_KEY}`
        );
        const omdbData = omdbResponse.data;

        if (omdbData.Response === 'True') {
            return res.status(200).json({
                success: true,
                movies: omdbData.Search,
                totalResults: parseInt(omdbData.totalResults || '0', 10),
            });
        } else if (omdbData.Response === 'False' && omdbData.Error === 'Movie not found!') {
            return res.status(200).json({
                success: true,
                movies: [],
                totalResults: 0,
                message: 'No movies found for your search.',
            });
        } else {
            return res.status(400).json({ success: false, message: omdbData.Error || 'Failed to fetch movies from OMDb.' });
        }
    } catch (error: any) {
        console.error('Error fetching movies from OMDb via backend:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error while fetching movies.' });
    }
};

export const getMovieDetails = async (req: Request, res: Response) => {
    const { imdbID } = req.params;

    if (!OMDB_API_KEY) {
        return res.status(500).json({ success: false, message: 'Server OMDb API Key is missing.' });
    }
    if (!imdbID || typeof imdbID !== 'string') {
        return res.status(400).json({ success: false, message: 'Movie IMDb ID is required.' });
    }

    try {
        const omdbResponse = await axios.get(
            `${OMDB_API_BASE_URL}?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`
        );
        const omdbData = omdbResponse.data;

        if (omdbData.Response === 'True') {
            return res.status(200).json({ success: true, movie: omdbData });
        } else {
            return res.status(404).json({ success: false, message: omdbData.Error || 'Movie details not found.' });
        }
    } catch (error: any) {
        console.error('Error fetching movie details from OMDb via backend:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error while fetching movie details.' });
    }
};