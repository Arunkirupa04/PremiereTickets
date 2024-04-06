const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the movie title"],
    },
    description: {
      type: String,
      required: [true, "Please enter the movie description"],
    },
    genre: {
      type: String,
      required: [true, "Please enter the movie genre"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Please enter the movie release date"],
    },
    posterURL: {
      type: String,
      required: [true, "Please enter the movie poster URL"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Reference to the admin who added the movie
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
