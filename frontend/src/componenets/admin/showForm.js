import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import { getAllMovies } from "../../actions/admin/movie";
import { getAllTheatres } from "../../actions/admin/theatre";
import { createShow } from "../../actions/admin/show";

const ShowForm = () => {
  const [formData, setFormData] = useState({
    date: [],
    time: "",
    theatre: "",
    movie: "",
  });
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchTheatres();
  }, []);

  const fetchMovies = async () => {
    try {
      const moviesData = await getAllMovies();
      setMovies(moviesData.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTheatres = async () => {
    try {
      const theatresData = await getAllTheatres();
      setTheatres(theatresData.data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      // If it's a time selection, handle multiple selections
      const updatedTimes = [...formData.time];
      if (updatedTimes.includes(value)) {
        // Remove time if already selected
        const index = updatedTimes.indexOf(value);
        updatedTimes.splice(index, 1);
      } else {
        // Add time if not already selected
        updatedTimes.push(value);
      }
      setFormData({ ...formData, [name]: updatedTimes });
    } else {
      // For other fields, update as usual
      setFormData({ ...formData, [name]: value });
    }

    if (name === "theatre") {
      const selectedTheatre = theatres.find((theatre) => theatre._id === value);
      if (selectedTheatre) {
        setShowtimes(selectedTheatre.showTimes);
      } else {
        setShowtimes([]);
      }
    }
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const updatedDates = [...formData.date];
    if (updatedDates.includes(value)) {
      // Remove date if already selected
      const index = updatedDates.indexOf(value);
      updatedDates.splice(index, 1);
    } else {
      // Add date if not already selected
      updatedDates.push(value);
    }
    setFormData({ ...formData, date: updatedDates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("form Daa", formData);
      await createShow(formData.theatre, formData);
      console.log("Show created successfully");
    } catch (error) {
      console.error("Error creating show:", error);
    }
    setShowtimes([]);
    setFormData({
      date: [],
      time: "",
      theatre: "",
      movie: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Theatre</InputLabel>
              <Select
                name="theatre"
                value={formData.theatre}
                onChange={handleChange}
                required
              >
                {theatres.map((theatre) => (
                  <MenuItem key={theatre._id} value={theatre._id}>
                    {theatre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography>Showtimes</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="time"
                      value="All" // Add a checkbox for selecting all showtimes
                      onChange={handleChange}
                    />
                  }
                  label="All"
                />
                {showtimes.map((showtime) => (
                  <FormControlLabel
                    key={showtime}
                    control={
                      <Checkbox
                        name="time"
                        value={showtime}
                        onChange={handleChange}
                      />
                    }
                    label={showtime}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Movie</InputLabel>
              <Select
                name="movie"
                value={formData.movie}
                onChange={handleChange}
                required
              >
                {movies.map((movie) => (
                  <MenuItem key={movie._id} value={movie._id}>
                    {movie.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>Date</Typography>
            <Grid container spacing={2}>
              {getTwoWeeks().map((date) => (
                <Grid item xs={6} key={date}>
                  {" "}
                  {/* Set xs={6} for two columns */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                      />
                    }
                    label={date}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Show
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const getTwoWeeks = () => {
  const today = new Date();
  const date = [];
  for (let i = 0; i < 14; i++) {
    const datelist = new Date(today);
    datelist.setDate(datelist.getDate() + i);
    date.push(datelist.toISOString().split("T")[0]); // Extract date in YYYY-MM-DD format
  }
  return date;
};

export default ShowForm;
