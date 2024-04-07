import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";

const ShowForm = ({ theatres, movies, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    theatre: "",
    movie: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function and pass the form data
    onSubmit(formData);
    // Reset the form fields after submission
    setFormData({
      date: "",
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
            <Typography> Theatre {theatres.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
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
            <Button type="submit" variant="contained" color="primary">
              Add Show
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ShowForm;
