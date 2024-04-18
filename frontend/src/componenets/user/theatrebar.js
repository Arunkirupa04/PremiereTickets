import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Stack, Typography } from "@mui/material";

const TheatreBar = () => {
  const movie = useSelector((state) => state.movie.currentMovie);
  const theatre = useSelector((state) => state.theatre);

  return (
    <Paper
      elevation={4}
      sx={{ width: "100%", bgcolor: "primary.main", color: "white", p: 2 }}
    >
      <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
        <Typography variant="h6" fontWeight={600}>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
          {" "}
          | {movie.language}
        </Typography>
      </Stack>
      <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
        <Typography variant="subtitle1" fontWeight={300}>
          {theatre.name}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={300}
          sx={{ marginLeft: "10px" }}
        >
          | {theatre.location}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default TheatreBar;
