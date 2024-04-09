// actions/movieActions.js

import axios from "axios";

const baseURL = "http://localhost:5000/api/movie";

// Function to fetch all movies from the backend
export const getAllMovies = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Function to create a new movie
export const createMovie = async (movieData) => {
  try {
    const response = await axios.post(baseURL, movieData);
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

// Function to update a movie by ID
export const updateMovie = async (movieId, movieData) => {
  try {
    const response = await axios.put(`${baseURL}/${movieId}`, movieData);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// Function to delete a movie by ID
export const deleteMovie = async (movieId) => {
  try {
    const response = await axios.delete(`${baseURL}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
