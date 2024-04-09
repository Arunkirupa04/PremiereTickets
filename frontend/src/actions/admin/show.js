// Import axios for making HTTP requests
import axios from "axios";

// Define the base URL for the backend API
const baseURL = "http://localhost:5000/api/theatre"; // Update the URL with your actual backend API URL

// Function to fetch all shows for a theatre from the backend
export const getAllShowsForTheatre = async (theatreId) => {
  try {
    const response = await axios.get(`${baseURL}/shows/collection`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shows for theatre:", error);
    throw error;
  }
};

// Function to create a new show for a theatre
export const createShow = async (theatreId, showData) => {
  console.log(theatreId);
  try {
    const response = await axios.post(
      `${baseURL}/${theatreId}/shows`,
      showData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating show:", error);
    throw error;
  }
};

// Function to update a show for a theatre by ID
export const updateShowForTheatre = async (theatreId, showId, showData) => {
  try {
    const response = await axios.put(
      `${baseURL}/${theatreId}/shows/${showId}`,
      showData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating show:", error);
    throw error;
  }
};

// Function to delete a show for a theatre by ID
export const deleteShowForTheatre = async (theatreId, showId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/${theatreId}/shows/${showId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting show:", error);
    throw error;
  }
};
