const Show = require("../models/showModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Function to create a new show
exports.createShow = catchAsyncError(async (req, res) => {
  const { date, time, theatre, movie, bookings } = req.body;
  const show = await Show.create({ date, time, theatre, movie, bookings });
  res.status(201).json({ success: true, data: show });
});

// Function to update a show by ID
exports.updateShow = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { date, time, theatre, movie, bookings } = req.body;
  const show = await Show.findByIdAndUpdate(
    id,
    { date, time, theatre, movie, bookings },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!show) {
    return res.status(404).json({ success: false, error: "Show not found" });
  }
  res.status(200).json({ success: true, data: show });
});

// Function to delete a show by ID
exports.deleteShow = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const show = await Show.findByIdAndDelete(id);
  if (!show) {
    return res.status(404).json({ success: false, error: "Show not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all shows
exports.getAllShows = catchAsyncError(async (req, res) => {
  const shows = await Show.find();
  res.status(200).json({ success: true, data: shows });
});
