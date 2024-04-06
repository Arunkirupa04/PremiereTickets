const Movie = require("../models/movieModel");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Function to create a new movie
exports.createMovie = catchAsyncError(async (req, res) => {
  const { title, description, genre, releaseDate, posterURL, featured, admin } =
    req.body;
  const movie = await Movie.create({
    title,
    description,
    genre,
    releaseDate,
    posterURL,
    featured,
    admin,
  });
  res.status(201).json({ success: true, data: movie });
});

// Function to update a movie by ID
exports.updateMovie = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    genre,
    releaseDate,
    posterURL,
    featured,
    availableScreens,
    admin,
  } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    id,
    {
      title,
      description,
      genre,
      releaseDate,
      posterURL,
      featured,
      availableScreens,
      admin,
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
exports.deleteMovie = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ success: false, error: "Movie not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all movies
exports.getAllMovies = catchAsyncError(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ success: true, data: movies });
});
