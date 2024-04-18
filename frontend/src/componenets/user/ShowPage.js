import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Box, Divider, colors } from "@mui/material";
import { Colors } from "../../theme";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { getMovie, getTheatresAndShows } from "../../actions/user/showsAction";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
import { setShowDetails } from "../../Reducers/showSlice";
import { setTheatreDetails } from "../../Reducers/theatreSlice";
import { setMovieDetails } from "../../Reducers/movieSlice"; // Import the action
import { grey } from "@mui/material/colors";

const ShowPageUser = () => {
  const { movieId } = useParams();
  const [groupedShowsByDateAndTheatre, setGroupedShowsByDateAndTheatre] =
    useState({});
  const [movieData, setMovieData] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate(); // Create history instance
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await getTheatresAndShows(movieId);
        const showsData = showsResponse.data;
        const movieResponse = await getMovie(movieId);
        setMovieData(movieResponse.movie);
        dispatch(setMovieDetails(movieResponse.movie)); // Dispatch action to set movie details in the store

        // Process showsData to group by date and then by theatre
        const groupedByDateAndTheatre = showsData.reduce((acc, show) => {
          const showDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
          }).format(new Date(show.showDetails.date));

          if (!acc[showDate]) {
            acc[showDate] = {};
          }

          const theatreId = show.theatreDetails._id;
          if (!acc[showDate][theatreId]) {
            acc[showDate][theatreId] = {
              theatreId: show.theatreDetails._id,
              name: show.theatreDetails.name,
              location: show.theatreDetails.location,
              ticketPrice: show.theatreDetails.ticketPrice,
              shows: [],
            };
          }

          acc[showDate][theatreId].shows.push({ show: show.showDetails });
          return acc;
        }, {});

        console.log("Grouped by Date and Theatre", groupedByDateAndTheatre);
        setGroupedShowsByDateAndTheatre(groupedByDateAndTheatre);
        const firstDate = Object.keys(groupedByDateAndTheatre)[0];
        setCurrentDate(firstDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieId, dispatch]);

  const handleShowClick = (theatreId, showId) => {
    const selectedTheatre =
      groupedShowsByDateAndTheatre[currentDate][theatreId];
    const selectedShow = selectedTheatre.shows.find(
      (show) => show.show._id === showId
    );

    console.log("ss", selectedShow);
    // Dispatch the actions
    dispatch(
      setTheatreDetails({
        theatreId: selectedTheatre.theatreId,
        name: selectedTheatre.name,
        location: selectedTheatre.location, // Assuming location is part of the data
        ticketPrice: selectedTheatre.ticketPrice, // Assuming ticketPrice is part of the data
        showTimes: selectedTheatre.shows.map((show) => show.show.time),
      })
    );

    dispatch(
      setShowDetails({
        showId: selectedShow.show._id,
        date: currentDate,
        time: selectedShow.show.time,
        movieId: movieId,
      })
    );

    // Navigate to the seating page
    navigate(`/seating/${showId}`, { state: { theatreId: theatreId } });
  };

  return (
    <Box sx={{ bgcolor: grey[300], minHeight: "100vh", pb: "20px" }}>
      <Navbar />
      {/* Layout code unchanged */}
      <Grid container spacing={0} width={"100%"} sx={{ bgcolor: grey[300] }}>
        <Grid item xs={12}>
          <Box
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              bgcolor: "#171717",
              padding: "40px 7vw",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxWidth: { xs: 250, md: 180 },
                maxHeight: { xs: 350, md: 250 },
              }}
              alt="The movie poster"
              src={movieData.posterURL}
            />
            {/* Text Content on the right */}
            <Box sx={{ flex: 1, ml: "50px", mb: "auto" }}>
              <Typography variant="h4" color={"white"}>
                {movieData.title}
              </Typography>
              <Typography variant="subtitle1" color={"white"}>
                Language: {movieData.language} | Genre: {movieData.genre}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color={"white"}>
                {movieData.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} my={"20px"}>
          <Paper elevation={0} sx={{ padding: "0 7vw", bgcolor: grey[300] }}>
            {Object.entries(groupedShowsByDateAndTheatre).map(
              ([key], index) => (
                <Box
                  sx={{
                    py: "20px",
                    px: "10px",
                    width: "100px",
                    display: "inline",
                    cursor: "pointer",
                    transition: "0.5s ease",
                    fontWeight: "500",
                    bgcolor: key === currentDate ? "grey" : "transparent", // Use 'transparent' for no background color
                    ":hover": {
                      bgcolor: Colors.dovegrey,
                    },
                  }}
                  key={index}
                  onClick={() => {
                    setCurrentDate(key);
                    console.log;
                  }}
                >
                  {" "}
                  {key}
                </Box>
              )
            )}{" "}
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <Paper sx={{ padding: " 30px", mx: "7vw", width: "100%" }}>
            {currentDate && groupedShowsByDateAndTheatre[currentDate] ? (
              Object.entries(groupedShowsByDateAndTheatre[currentDate]).map(
                ([theatreId, theatreData]) => (
                  <React.Fragment key={theatreId}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                      {theatreData.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {theatreData.shows.map((showDetail, index) => (
                        <Box
                          key={index}
                          onClick={() =>
                            handleShowClick(theatreId, showDetail.show._id)
                          }
                          sx={{
                            backgroundColor: Colors.dovegrey,
                            width: "80px",
                            padding: "10px",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {showDetail.show.time}{" "}
                          {/* Accessing the time property of each show */}
                        </Box>
                      ))}
                    </Box>
                    <Divider sx={{ marginY: 2 }} />
                  </React.Fragment>
                )
              )
            ) : (
              <Typography>No shows available for this date.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowPageUser;
