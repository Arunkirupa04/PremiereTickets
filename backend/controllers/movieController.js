const Movie = require("../models/movieModel");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Function to create a new movie
exports.createMovie = catchAsyncError(async (req, res, next) => {
  const {
    title,
    description,
    genre,
    releaseDate,
    posterURL,
    featured,
    language,
    Isreleased,
  } = req.body;
  const movie = await Movie.create({
    title,
    description,
    genre,
    language,
    Isreleased,
    releaseDate,
    posterURL,
    featured,
  });
  res.status(201).json({ success: true, data: movie });
});

// Function to update a movie by ID
exports.updateMovie = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    genre,
    language,
    Isreleased,
    releaseDate,
    posterURL,
    featured,
    availableScreens,
  } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    id,
    {
      title,
      description,
      genre,
      language,
      releaseDate,
      posterURL,
      featured,
      Isreleased,
      availableScreens,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!movie) {
    return res.status(404).json({ success: false, error: "Movie not found" });
  }
  res.status(200).json({ success: true, data: movie });
});

// Function to delete a movie by ID
exports.deleteMovie = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ success: false, error: "Movie not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all movies
exports.getAllMovies = catchAsyncError(async (req, res, next) => {
  const movies = await Movie.find();
  res.status(200).json({ success: true, data: movies });
});

//filter movies from database
exports.filterMovies = catchAsyncError(async (req, res, next) => {
  const { genre, isReleased, language } = req.query;

  let query = {};

  // Add filters based on query parameters
  if (genre) {
    query.genre = genre;
  }
  if (isReleased) {
    query.Isreleased = isReleased;
  }
  if (language) {
    query.language = language;
  }

  const movies = await Movie.find(query);

  res.status(200).json({ success: true, data: movies });
});
