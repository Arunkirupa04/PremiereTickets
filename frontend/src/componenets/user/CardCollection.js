import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import MovieCard from "./movieCard";

const MovieRow = ({ movies }) => {
  return (
    <div style={{ textAlign: "left" }}>
      {" "}
      <Typography variant="h6" sx={{ margin: "30px 7vw" }}>
        Movies
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          margin: "0 7vw ",
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard
            id={movie._id}
            title={movie.title}
            img={movie.posterURL}
            language={movie.language}
            genre={movie.genre}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
