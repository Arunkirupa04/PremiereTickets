const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");
const Movie = require("../models/movieModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Function to create a new theatre
exports.createTheatre = catchAsyncError(async (req, res, next) => {
  const { name, capacity, ticketPrice, showTimes, location } = req.body;
  const theatre = await Theatre.create({
    name,
    location,
    capacity,
    ticketPrice,
    showTimes,
  });
  res.status(201).json({ success: true, data: theatre });
});

// Function to update a theatre by ID
exports.updateTheatre = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, location, capacity, ticketPrice, showTimes } = req.body;
  const theatre = await Theatre.findByIdAndUpdate(
    id,
    { name, location, capacity, ticketPrice, showTimes },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!theatre) {
    return next({ status: 404, message: "Theatre not found" });
  }
  res.status(200).json({ success: true, data: theatre });
});

// Function to delete a theatre by ID
exports.deleteTheatre = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const theatre = await Theatre.findByIdAndDelete(id);
  if (!theatre) {
    return next({ status: 404, message: "Theatre not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all theatres
exports.getAllTheatres = catchAsyncError(async (req, res, next) => {
  const theatres = await Theatre.find();
  res.status(200).json({ success: true, data: theatres });
});

exports.getAllTheatresWithShowsAndMovies = catchAsyncError(
  async (req, res, next) => {
    try {
      // Fetch all theatres
      const theatres = await Theatre.find();

      // For each theatre, fetch its associated shows
      const theatresWithShows = await Promise.all(
        theatres.map(async (theatre) => {
          const theatreWithShows = theatre.toObject(); // Convert Mongoose document to plain JavaScript object
          theatreWithShows.shows = []; // Initialize array to store shows for this theatre

          // Fetch shows for this theatre
          const shows = await Show.find({ theatre: theatre._id });

          // For each show, fetch its associated movie
          for (const show of shows) {
            const movie = await Movie.findById(show.movie);
            if (movie) {
              theatreWithShows.shows.push({ show, movie }); // Add show and associated movie to the array
            }
          }

          return theatreWithShows;
        })
      );

      // Send the response after all theatres with shows and movies are fetched
      res.status(200).json({ success: true, data: theatresWithShows });
    } catch (error) {
      // Handle errors
      next(error);
    }
  }
);
