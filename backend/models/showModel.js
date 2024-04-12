const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Please enter the show date"],
    },
    time: {
      type: String,
      required: [true, "Please select a show time"],
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre", // Reference to the theatre where the show is scheduled
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // Reference to the movie being shown
      required: true,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    availableSeats: [
      {
        // Stores available seats as objects with row and col properties
        row: Number,
        col: Number,
      },
    ],
    bookedSeats: [
      {
        // Stores available seats as objects with row and col properties
        row: Number,
        col: Number,
      },
    ],
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
