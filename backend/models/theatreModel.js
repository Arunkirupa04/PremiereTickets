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
      required: false, // This can be optional as not all theatres might have footpaths
    },
    // You can add more attributes as needed
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
