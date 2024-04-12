const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the theatre name"],
    },
    location: {
      type: String,
      required: [true, "Please enter the theatre location"],
    },
    capacity: {
      type: Number,
      required: [true, "Please enter the theatre capacity"],
    },
    ticketPrice: {
      type: Number,
      required: [true, "Please enter the ticket price"],
    },
    showTimes: {
      type: [String], // Assuming show times are represented as strings
      required: [true, "Please enter the show times"],
    },
    shows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show", // Reference to the Show model
      },
    ],
    seatingPattern: {
      type: [[Number]], // 2D array to represent seat availability (0 or 1)
      required: [true, "Please provide the seating pattern"],
    },
    footpaths: {
      type: [Number], // Array of column indices after which footpaths occur
    },
    availableSeats: [
      {
        // Stores available seats as objects with row and col properties
        row: Number,
        col: Number,
      },
    ],
  },
  { timestamps: true }
);

// Method to update available seats based on the seating pattern
theatreSchema.methods.updateAvailableSeats = function () {
  this.availableSeats = []; // Clear the current available seats
  this.seatingPattern.forEach((row, rowIndex) => {
    row.forEach((seat, colIndex) => {
      if (seat === 1) {
        // If the seat is available (1)
        this.availableSeats.push({ row: rowIndex, col: colIndex });
      }
    });
  });
};

// Ensure the available seats are updated before saving
theatreSchema.pre("save", function (next) {
  this.updateAvailableSeats();
  next();
});

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
