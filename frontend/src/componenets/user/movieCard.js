import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const MovieCard = ({ title, img, language, genre }) => {
  return (
    <Card
      sx={{ width: "280px", height: "400px", padding: "10px" }}
      variant="outlined"
    >
      <CardMedia
        component="img"
        image={img}
        style={{
          width: "100%",
          height: "80%",
          objectFit: "cover",
          borderRadius: "3px",
        }}
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {language} | {genre}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
