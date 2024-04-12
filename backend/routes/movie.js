const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);
router.get("/featured/", movieController.getFeaturedMovies);
router.get("/:id", movieController.findMovieById);
router.get("/", movieController.getAllMovies);
router.get("/filter", movieController.filterMovies);

module.exports = router;
