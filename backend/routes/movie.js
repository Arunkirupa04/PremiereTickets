const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);
router.get("/", movieController.getAllMovies);

module.exports = router;
