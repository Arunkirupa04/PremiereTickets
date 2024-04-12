import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      className="slick-arrow"
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "12%",
        top: -50,
        borderRadius: "10px",
        border: "solid 1px black",
      }}
    >
      <ChevronRightIcon />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      className="slick-arrow"
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "8%",
        top: -50,
        borderRadius: "10px",
        border: "solid 1px black",
      }}
    >
      <ChevronLeftIcon />
    </IconButton>
  );
};
const ImageSlider = ({ movies, onMovieClick }) => {
  // Add onMovieClick prop
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 6.7,
    slidesToScroll: 2,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleMovieClick = (movieId) => {
    if (onMovieClick) {
      onMovieClick(movieId); // Pass the movie ID to the parent component
    }
  };

  return (
    <Slider {...settings}>
      {movies &&
        movies.map((movie) => (
          <Box
            key={movie._id}
            onClick={() => handleMovieClick(movie._id)}
            sx={{
              padding: "25px",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <img
              src={movie.posterURL}
              alt={movie.title}
              style={{
                width: "150px",
                height: "200px",
                borderRadius: "12px",
                boxShadow: "rgba(0,0,0,1)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease", // Transition effect for boxShadow and transform
                cursor: "pointer", // Change cursor on hover
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.8)"; // Change boxShadow on hover
                e.currentTarget.style.transform = "scale(1.15)"; // Scale effect on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "rgba(0,0,0,1)"; // Reset boxShadow on mouse out
                e.currentTarget.style.transform = "scale(1)"; // Reset scale on mouse out
              }}
            />
          </Box>
        ))}
    </Slider>
  );
};

export default ImageSlider;
