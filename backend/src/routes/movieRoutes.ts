import express from 'express';
import { protect } from '../middleware/auth';
import { searchMovies, getMovieDetails, addFavorite, removeFavorite, getFavorites } from '../controllers/movieController'; 
const router = express.Router();

router.get('/search', searchMovies);
router.get('/details/:imdbID', getMovieDetails);
router.post('/users/favorites/:movieId', protect, addFavorite);
router.delete('/users/favorites/:movieId', protect, removeFavorite);
router.get('/users/favorites', protect, getFavorites);

export default router;