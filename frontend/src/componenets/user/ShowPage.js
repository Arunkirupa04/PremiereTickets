import React from "react";
import { Grid, Typography, Paper, Box, Divider } from "@mui/material";
import { Colors } from "../../theme";

const ShowsPage = () => {
  // Dummy data for demonstration
  const dummyDates = ["12", "13", "14", "15", "16", "17", "18"];

  const movie = {
    title: "Spiderman",
    language: "English",
    genre: "Action",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  // Dummy data for theaters and shows
  const theaters = [
    {
      name: "Theater 1",
      shows: ["10:00 AM", "02:00 PM", "06:00 PM"],
    },
    {
      name: "Theater 2",
      shows: ["11:00 AM", "03:00 PM", "07:00 PM"],
    },
    // Add more theaters as needed
  ];

  return (
    <Grid container spacing={3} sx={{ justifyContent: "center" }}>
      {/* Movie Description */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "30px 7vw" }}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1">
            Language: {movie.language} | Genre: {movie.genre}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1">{movie.description}</Typography>
        </Paper>
      </Grid>

      {/* Dates */}
      <Grid item xs={12} md={12}>
        <Paper elevation={0} sx={{ padding: "0 7vw" }}>
          <Typography variant="h5">Dates</Typography>
          <Divider sx={{ marginY: 2 }} />
          {dummyDates.map((date, index) => (
            <Box
              key={index}
              variant="body1"
              sx={{
                backgroundColor: Colors.Inborder,
                width: "40px",
                padding: "10px",
                margin: "10px",
                textAlign: "center",
                borderRadius: "6px",
                display: "inline-flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>{date}</Typography>
            </Box>
          ))}
        </Paper>
      </Grid>

      {/* Theatres and Shows */}
      <Grid item xs={12} md={10}>
        <Paper elevation={1} sx={{ padding: 3 }}>
          <Typography variant="h5">Theatres and Shows</Typography>
          <Divider sx={{ marginY: 2 }} />
          {theaters.map((theater, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">{theater.name}</Typography>
              {theater.shows.map((show, idx) => (
                <Box
                  key={idx}
                  variant="body1"
                  sx={{
                    backgroundColor: Colors.dovegrey,
                    width: "80px",
                    padding: "10px",
                    margin: "10px",
                    textAlign: "center",
                    borderRadius: "4px",
                    display: "inline-flex",
                    cursor: "pointer",
                  }}
                >
                  {show}
                </Box>
              ))}
              <Divider sx={{ marginY: 2 }} />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShowsPage;
