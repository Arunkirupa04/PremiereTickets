import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Box, Divider } from "@mui/material";
import { Colors } from "../../theme";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { getMovie, getTheatresAndShows } from "../../actions/user/showsAction";

const ShowPageUser = () => {
  const { movieId } = useParams();
  const [groupedShowsByDateAndTheatre, setGroupedShowsByDateAndTheatre] =
    useState({});
  const [movieData, setMovieData] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await getTheatresAndShows(movieId);
        const showsData = showsResponse.data;
        const movieResponse = await getMovie(movieId);
        setMovieData(movieResponse.movie);

        // Process showsData to group by date and then by theatre
        const groupedByDateAndTheatre = showsData.reduce((acc, show) => {
          const showDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(show.showDetails.date));

          if (!acc[showDate]) {
            acc[showDate] = {};
          }

          const theatreId = show.theatreDetails._id;
          if (!acc[showDate][theatreId]) {
            acc[showDate][theatreId] = {
              name: show.theatreDetails.name,
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
  }, [movieId]);

  return (
    <div>
      <Navbar />
      {/* Layout code unchanged */}
      <Grid
        container
        spacing={3}
        sx={{ bgcolor: Colors.creme, paddingX: "7vw", paddingBottom: "20px" }}
      >
        <Grid item xs={12} sx={{ marginY: "20px" }}>
          <Paper
            elevation={0}
            sx={{
              padding: "30px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              bgcolor: Colors.creme,
            }}
          >
            {/* Poster Image on the left */}
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxWidth: { xs: 250, md: 180 },
                maxHeight: { xs: 350, md: 250 },
                border: "solid black 1px",
                borderRadius: "6px",
              }}
              alt="The movie poster"
              src={movieData.posterURL}
            />
            {/* Text Content on the right */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4">{movieData.title}</Typography>
              <Typography variant="subtitle1">
                Language: {movieData.language} | Genre: {movieData.genre}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{movieData.description}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper elevation={0} sx={{ padding: 2, bgcolor: Colors.creme }}>
            {Object.entries(groupedShowsByDateAndTheatre).map(
              ([key], index) => (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: Colors.InPholder,
                    borderRadius: "6px",
                    m: "10px",
                    p: "10px",
                    width: "100px",
                    display: "inline",
                    cursor: "pointer",
                    transition: "0.5s ease",
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
          <Paper sx={{ padding: "30px" }}>
            {currentDate && groupedShowsByDateAndTheatre[currentDate] ? (
              Object.entries(groupedShowsByDateAndTheatre[currentDate]).map(
                ([theatreId, theatreData]) => (
                  <React.Fragment key={theatreId}>
                    <Typography variant="subtitle1">
                      {theatreData.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {theatreData.shows.map((showDetail, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: Colors.dovegrey,
                            width: "80px",
                            padding: "10px",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          // Optional: onClick handler to do something when a show time is clicked
                          onClick={() =>
                            console.log(
                              `Selected show ID: ${showDetail.show._id}`
                            )
                          }
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
    </div>
  );
};

export default ShowPageUser;
