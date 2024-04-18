import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MovieForm from "./movieForm";
import MovieUpdate from "./MovieUpdate";
import {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../actions/admin/movie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [isModalOpen]);

  const fetchMovies = async () => {
    try {
      const movieData = await getAllMovies();
      console.log(movieData.data);
      setMovies(movieData.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleOpenUpdate = (movie) => {
    console.log(movie);
    setSelectedMovie(movie);
    console.log(selectedMovie);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedMovie(null);
  };

  const handleUpdateMovie = async (updatedMovie) => {
    try {
      await updateMovie(updatedMovie._id, updatedMovie);
      fetchMovies(); // Fetch movies again to update the list
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies(); // Fetch movies again to update the list
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };
  const handleCreateMovie = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography fontWeight={500} fontSize={20}>
          Movies List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleCreateMovie}
          sx={{ marginBottom: 2 }}
        >
          Create New Movie
        </Button>
      </Stack>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent>
          <MovieForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Stack gap={2} direction="row" flexWrap="wrap">
        {movies.map((movie) => (
          <Card
            key={movie._id}
            sx={{
              maxWidth: 345,
              minWidth: 345,
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={movie.posterURL}
              alt={movie.title}
            />
            <CardContent sx={{ textAlign: "left" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                fontWeight={500}
              >
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Genre: {movie.genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Language: {movie.language}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => handleOpenUpdate(movie)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => handleDelete(movie._id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
      {selectedMovie && (
        <MovieUpdate
          open={openUpdate}
          onClose={handleCloseUpdate}
          movie={selectedMovie}
          onUpdate={handleUpdateMovie}
        />
      )}
    </div>
  );
};

export default Movies;
