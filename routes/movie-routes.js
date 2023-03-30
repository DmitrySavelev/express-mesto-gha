const express = require('express');

const router = express.Router();
const {
  getMovies,
  getMovie,
  deleteMovie,
  addMovie,
  updateMovie,
} = require('../controllers/movie-controllers');

router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);
router.delete('/movies/:id', deleteMovie);
router.post('/movies', addMovie);
router.patch('/movies/:id', updateMovie);

module.exports = router;
