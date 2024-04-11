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
  Input,
} from "@mui/material";
import { createMovie } from "../../actions/admin/movie"; // Import the createMovie function
import { uploadImage } from "../../utils/firebase"; // Import the uploadImage function

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
    const { name, value, files } = e.target;

    // Check if the input is a file input
    if (files) {
      // Upload the image file
      handleImageUpload(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (file) => {
    try {
      // Upload the image file to Firebase Storage
      const imageUrl = await uploadImage(file);
      // Set the image URL in the form data
      setFormData({ ...formData, posterURL: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the movie with the form data
      await createMovie(formData);
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
            {/* Customized file input with Material-UI */}
            <FormControl fullWidth>
              <InputLabel htmlFor="poster-upload">Poster Image</InputLabel>
              <Input
                id="poster-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                name="posterURL"
                required
              />
            </FormControl>
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
