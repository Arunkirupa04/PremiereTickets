const Booking = require("../models/bookingModel.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");

// Function to create a new booking
exports.createBooking = catchAsyncError(async (req, res) => {
  const { theatre, show, user, seatNumbers } = req.body;
  const booking = await Booking.create({ theatre, show, user, seatNumbers });
  res.status(201).json({ success: true, data: booking });
});

// Function to delete a booking by ID
exports.deleteBooking = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) {
    return res.status(404).json({ success: false, error: "Booking not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all bookings
exports.getAllBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json({ success: true, data: bookings });
});
