const express = require("express");
const router = express.Router();
const {
  createTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
} = require("../controllers/theatreController");

// Routes for theatres
router.route("/theatre/").post(createTheatre); // Create a new theatre
router.route("/theatre/:id").put(updateTheatre); // Update a theatre by ID
router.route("/theatre/:id").delete(deleteTheatre); // Delete a theatre by ID
router.route("/theatre/").get(getAllTheatres); // Get all theatres

module.exports = router;
