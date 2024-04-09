import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { createMovie } from "../../actions/admin/movie"; // Import the createMovie function

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    releaseDate: "",
    posterURL: "",
    featured: false,
    Isreleased: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(formData); // Call createMovie function with form data
      console.log("Movie created successfully");
      // Optionally, you can handle success or navigate to a different page
    } catch (error) {
      console.error("Error creating movie:", error);
      // Optionally, you can show an error message to the user
    }
    // Reset the form fields after submission
    setFormData({
      title: "",
      description: "",
      genre: "",
      language: "",
      releaseDate: "",
      posterURL: "",
      featured: false,
      Isreleased: true,
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Poster URL"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Featured</InputLabel>
              <Select
                name="featured"
                value={formData.featured}
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MovieForm;
