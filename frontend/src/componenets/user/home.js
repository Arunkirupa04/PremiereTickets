import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import Navbar from "./navbar";
import ImageSlider from "./imageSlider";
import MovieRow from "./CardCollection";
import { fetchAllMovies } from "../../actions/user/homeAction"; // Adjust the path accordingly

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null); // State for the current movie
  const [imageUrl, setImageUrl] = useState(
    "https://w0.peakpx.com/wallpaper/144/660/HD-wallpaper-official-spider-man-no-way-home-poster.jpg"
  );

  const handleMovieClick = (movieId) => {
    // Fetch the movie details based on the movieId and update the imageUrl state
    const selectedMovie = movies.find((movie) => movie._id === movieId);
    if (selectedMovie) {
      setImageUrl(selectedMovie.posterURL);
      setCurrentMovie(selectedMovie); // Update the current movie state
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchAllMovies();
      console.log(data.data);
      if (data) {
        setMovies(data.data);
        if (data.data.length > 0) {
          setCurrentMovie(data.data[0]); // Set the first movie as the current movie initially
        }
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid
          item
          xs={5}
          md={4}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: "100% auto",
            backgroundPosition: "center",
            height: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        ></Grid>
        <Grid item xs={7} md={8}>
          <img
            src={imageUrl}
            alt="Banner"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          position: "absolute",
          top: 0,
          height: "100vh",
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9),rgba(255,255,255,0.9),rgba(255,255,255,0), transparent),linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0), transparent),linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0),rgba(255,255,255,0), transparent)`,
        }}
      >
        <Navbar />
        <Grid item xs={12} md={12}>
          {" "}
          <Box
            sx={{
              textAlign: "left",
              paddingLeft: "120px",
              paddingTop: "0",
              marginTop: "30px",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "500" }}>
              {currentMovie && currentMovie.title}{" "}
              {/* Display current movie title */}
            </Typography>
            <Typography variant="subtitle1" sx={{ width: "40%" }}>
              {currentMovie && currentMovie.description}{" "}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
              {" "}
              {currentMovie && currentMovie.genre} |{" "}
              {currentMovie && currentMovie.language}{" "}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginBottom: "80px" }}
            >
              Book Tickets
            </Button>
          </Box>
          <ImageSlider
            movies={movies}
            onMovieClick={handleMovieClick}
            sx={{ marginTop: "100px" }}
          />
        </Grid>
      </Grid>{" "}
      <MovieRow movies={movies} />
    </div>
  );
};

export default Home;
