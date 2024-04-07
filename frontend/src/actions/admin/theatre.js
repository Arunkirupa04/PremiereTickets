import axios from "axios";

const baseURL = "http://localhost:5000/api/theatre";

// Function to fetch all theatres from the backend
export const getAllTheatres = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching theatres:", error);
    throw error;
  }
};

// Function to create a new theatre
export const createTheatre = async (theatreData) => {
  try {
    const response = await axios.post(baseURL, theatreData);
    return response.data;
  } catch (error) {
    console.error("Error creating theatre:", error);
    throw error;
  }
};

// Function to update a theatre by ID
export const updateTheatre = async (theatreId, theatreData) => {
  try {
    const response = await axios.put(`${baseURL}/${theatreId}`, theatreData);
    return response.data;
  } catch (error) {
    console.error("Error updating theatre:", error);
    throw error;
  }
};

// Function to delete a theatre by ID
export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axios.delete(`${baseURL}/${theatreId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting theatre:", error);
    throw error;
  }
};
