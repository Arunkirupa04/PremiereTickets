import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography, // Import Typography component
} from "@mui/material";

const TheatreUpdate = ({ theatre, onUpdate, open, onClose }) => {
  const [formData, setFormData] = useState({
    name: theatre.name,
    capacity: theatre.capacity,
    ticketPrice: theatre.ticketPrice,
    showTimes: theatre.showTimes.join(", "),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const showTimesArray = formData.showTimes
      .split(",")
      .map((time) => time.trim());
    const updatedTheatre = {
      ...theatre,
      name: formData.name,
      capacity: formData.capacity,
      ticketPrice: formData.ticketPrice,
      showTimes: showTimesArray,
    };
    onUpdate(updatedTheatre);
    onClose(); // Close the dialog after updating
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Update Theatre Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Name
          </Typography>
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Capacity
          </Typography>
          <TextField
            fullWidth
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Ticket Price
          </Typography>
          <TextField
            fullWidth
            name="ticketPrice"
            type="number"
            value={formData.ticketPrice}
            onChange={handleChange}
            required
          />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Show Times (comma-separated)
        </Typography>
        <TextField
          fullWidth
          name="showTimes"
          value={formData.showTimes}
          onChange={handleChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TheatreUpdate;
