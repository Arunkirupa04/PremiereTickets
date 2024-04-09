// In actions/movieActions.js

export const fetchAllMovies = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/movie/");
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data; // Assuming the response data is in JSON format
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};
