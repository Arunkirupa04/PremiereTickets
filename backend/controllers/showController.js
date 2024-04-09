const Show = require("../models/showModel");
const Theatre = require("../models/theatreModel");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Function to create a show for a specific theatre
exports.createShow = catchAsyncError(async (req, res, next) => {
  let { theatreId } = req.params; // Declare theatreId as a variable
  theatreId = theatreId.replace(/\/$/, ""); // Remove trailing backslash if present

  const { date, time, theatre, movie } = req.body; // Destructure date, time, theatre, and movie from the request body

  const theatreDoc = await Theatre.findById(theatre);
  if (!theatreDoc) {
    return res.status(404).json({ success: false, error: "Theatre not found" });
  }

  const createdShows = [];

  // Check if date and time are arrays, if not, convert them to arrays
  const datesArray = Array.isArray(date) ? date : [date];
  const timesArray = Array.isArray(time) ? time : [time];

  // Create shows for each combination of dates and times
  for (const dateItem of datesArray) {
    for (const timeItem of timesArray) {
      const showData = {
        date: dateItem,
        time: timeItem,
        theatre: theatreId,
        movie,
      };
      const show = await Show.create(showData);
      theatreDoc.shows.push(show._id);
      createdShows.push(show);
    }
  }

  await theatreDoc.save();

  res.status(201).json({ success: true, data: createdShows });
});

// Function to get all shows for a specific theatre
exports.getAllShowsForTheatre = catchAsyncError(async (req, res, next) => {
  let { theatreId } = req.params; // Declare theatreId as a variable
  theatreId = theatreId.replace(/\/$/, ""); // Remove trailing backslash if present

  const theatre = await Theatre.findById(theatreId).populate("shows");
  if (!theatre) {
    return res.status(404).json({ success: false, error: "Theatre not found" });
  }

  res.status(200).json({ success: true, data: theatre.shows });
});

// Function to get a specific show for a specific theatre
exports.getShowForTheatre = catchAsyncError(async (req, res, next) => {
  let { theatreId, showId } = req.params;
  theatreId = theatreId.replace(/\/$/, ""); // Remove trailing backslash if present

  const theatre = await Theatre.findById(theatreId).populate("shows");
  if (!theatre) {
    return res.status(404).json({ success: false, error: "Theatre not found" });
  }

  const show = theatre.shows.find((s) => s._id.toString() === showId);
  if (!show) {
    return res
      .status(404)
      .json({ success: false, error: "Show not found within the theatre" });
  }

  res.status(200).json({ success: true, data: show });
});

// Function to update a show for a specific theatre
exports.updateShowForTheatre = catchAsyncError(async (req, res, next) => {
  let { theatreId, showId } = req.params;
  theatreId = theatreId.replace(/\/$/, ""); // Remove trailing backslash if present

  const { date, time, movie } = req.body;

  // Validate the input data
  if (!date || !time || !movie) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    return res.status(404).json({ success: false, error: "Theatre not found" });
  }

  const showIndex = theatre.shows.findIndex((s) => s._id.toString() === showId);
  if (showIndex === -1) {
    return res
      .status(404)
      .json({ success: false, error: "Show not found within the theatre" });
  }

  try {
    // Update the show
    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { date, time, movie },
      {
        new: true,
        runValidators: true,
      }
    );

    // Update the show in the theatre's shows array
    theatre.shows[showIndex] = updatedShow;
    await theatre.save();

    // Return the updated show
    res.status(200).json({ success: true, data: updatedShow });
  } catch (error) {
    // Handle errors
    console.error("Error updating show:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Function to delete a show for a specific theatre
exports.deleteShowForTheatre = catchAsyncError(async (req, res, next) => {
  let { theatreId, showId } = req.params;
  theatreId = theatreId.replace(/\/$/, ""); // Remove trailing backslash if present

  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    return res.status(404).json({ success: false, error: "Theatre not found" });
  }

  const showIndex = theatre.shows.findIndex((s) => s._id.toString() === showId);
  if (showIndex === -1) {
    return res
      .status(404)
      .json({ success: false, error: "Show not found within the theatre" });
  }

  await Show.findByIdAndDelete(showId);

  theatre.shows.splice(showIndex, 1);
  await theatre.save();

  res.status(200).json({ success: true, data: {} });
});

// Function to fetch theatres where a given movie is present
exports.getTheatresWithMovie = catchAsyncError(async (req, res, next) => {
  const { movieId } = req.params;

  // Find all shows containing the given movie
  const shows = await Show.find({ movie: movieId });

  // Extract theatre ids from the found shows
  const theatreIds = shows.map((show) => show.theatre);

  // Find theatres associated with the extracted theatre ids
  const theatres = await Theatre.find({ _id: { $in: theatreIds } });

  res.status(200).json({ success: true, data: theatres });
});
