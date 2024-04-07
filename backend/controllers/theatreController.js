const Theatre = require("../models/theatreModel");
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
