// backend/src/routes/movieRoutes.ts
import express from 'express';
// Ensure correct named imports for functions
import { searchMovies, getMovieDetails } from '../controllers/movieController'; 
const router = express.Router();

router.get('/search', searchMovies);
router.get('/details/:imdbID', getMovieDetails);

export default router;