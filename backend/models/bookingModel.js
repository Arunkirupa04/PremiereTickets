const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre", // Reference to the show for which the booking is made
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show", // Reference to the show for which the booking is made
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who made the booking
      required: true,
    },
    seatNumbers: [
      {
        // Stores available seats as objects with row and col properties
        row: Number,
        col: Number,
      },
    ],
    // You can add more attributes as needed
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
