import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const MovieUpdate = ({ movie, onUpdate, open, onClose }) => {
  const [formData, setFormData] = useState({
    title: movie.title,
    description: movie.description,
    genre: movie.genre,
    language: movie.language,
    releaseDate: new Date(movie.releaseDate).toISOString().substr(0, 10),
    posterURL: movie.posterURL,
    featured: movie.featured,
    Isreleased: movie.Isreleased,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const updatedMovie = {
      ...movie,
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      language: formData.language,
      releaseDate: new Date(formData.releaseDate),
      posterURL: formData.posterURL,
      featured: formData.featured,
      Isreleased: formData.Isreleased,
    };
    onUpdate(updatedMovie);
    onClose(); // Close the dialog after updating
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Update Movie Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Title
          </Typography>
          <TextField
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Description
          </Typography>
          <TextField
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Genre
          </Typography>
          <TextField
            fullWidth
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Language
          </Typography>
          <TextField
            fullWidth
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Release Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Poster URL
          </Typography>
          <TextField
            fullWidth
            name="posterURL"
            value={formData.posterURL}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Featured
          </Typography>
          <TextField
            fullWidth
            type="boolean"
            name="featured"
            value={formData.featured}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Is Released
          </Typography>
          <TextField
            fullWidth
            type="boolean"
            name="Isreleased"
            value={formData.Isreleased}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieUpdate;
