const express = require("express");
const router = express.Router();
const {
  createTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresWithShowsAndMovies,
} = require("../controllers/theatreController");
const {
  createShow,
  getAllShowsForTheatre,
  getShowForTheatre,
  updateShowForTheatre,
  deleteShowForTheatre,
  getTheatresWithMovie,
  getTheatresAndShows,
} = require("../controllers/showController");

// Routes for theatres
router.route("/").post(createTheatre); // Create a new theatre
router.route("/:id").delete(deleteTheatre); // Delete a theatre by ID
router.route("/").get(getAllTheatres); // Get all theatres
router.route("/:id").put(updateTheatre); // Update a theatre by ID
router.route("/:theatreId/shows").post(createShow);
router.route("/:theatreId/shows").get(getAllShowsForTheatre);
router.route("/:theatreId/shows/:showId").get(getShowForTheatre);
router.route("/:theatreId/shows/:showId").put(updateShowForTheatre);
router.route("/:theatreId/shows/:showId").delete(deleteShowForTheatre);
router.route("/shows/collection").get(getAllTheatresWithShowsAndMovies);
// router.route("/filter/:movieId").get(getTheatresWithMovie);
router.route("/filterShows/:movieId").get(getTheatresAndShows);

module.exports = router;
