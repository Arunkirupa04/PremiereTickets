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

// Fetch Seating Pattern Action
export const fetchSeatingPattern = async (theatreId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/theatre/${theatreId}/seating`
    );
    if (response.status === 200) {
      return response.data.data; // return the seating pattern directly
    } else {
      console.error("Failed to fetch seating pattern: ", response.status);
      return null; // handle errors as needed
    }
  } catch (error) {
    console.error("Error fetching seating pattern: ", error);
    return null; // handle errors as needed
  }
};

export const getShow = async (showId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/theatre/${showId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching theatres and shows:", error);
    throw error;
  }
};
