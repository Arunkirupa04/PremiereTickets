const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the theatre name"],
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
    // You can add more attributes as needed
  },
  { timestamps: true }
);
const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
