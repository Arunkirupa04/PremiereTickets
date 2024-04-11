// actions/showActions.js

import axios from "axios";

// Function to fetch theatres and shows for a specific movie
export const getTheatresAndShows = async (movieId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/theatre/filterShows/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching theatres and shows:", error);
    throw error;
  }
};
export const getMovie = async (movieId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/movie/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching theatres and shows:", error);
    throw error;
  }
};
