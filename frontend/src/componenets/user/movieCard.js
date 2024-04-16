import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../theme";

const MovieCard = ({ id, title, img, language, genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/showPage/${id}`); // Assuming you want to navigate to a dynamic route
  };
  return (
    <Card
      sx={{
        width: "280px",
        height: "400px",
        transition: "0.7s ease",
        padding: "10px",
        cursor: "pointer",
        filter: "Grayscale(50%)",
        ":hover": {
          bgcolor: Colors.dovegrey,
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.015)",
          filter: "Grayscale(0%)",
        },
      }}
      variant="outlined"
      onClick={handleClick}
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
