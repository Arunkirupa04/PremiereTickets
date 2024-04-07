import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { createTheatre } from "../../actions/admin/theatre"; // Import the createTheatre function

const TheatreForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    ticketPrice: "",
    showTimes: [],
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createTheatre function with the form data
      await createTheatre(formData);
      // Reset the form fields after successful submission
      setFormData({
        name: "",
        capacity: "",
        ticketPrice: "",
        showTimes: [],
        location: "",
      });
      console.log("Theatre created successfully!");
    } catch (error) {
      console.error("Error creating theatre:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ticket Price"
              name="ticketPrice"
              type="number"
              value={formData.ticketPrice}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Show Times</InputLabel>
              <Select
                name="showTimes"
                multiple
                value={formData.showTimes}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                required
              >
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Theatre
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TheatreForm;
