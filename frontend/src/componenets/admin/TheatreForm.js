import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import { createTheatre } from "../../actions/admin/theatre"; // Ensure this function is adapted to handle the new data

const CombinedTheatreForm = () => {
  // Theatre details state
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    ticketPrice: "",
    showTimes: [],
    location: "",
  });

  // Seating pattern state
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [footpaths, setFootpaths] = useState([]);
  const [footpathInput, setFootpathInput] = useState("");
  const [seatingPattern, setSeatingPattern] = useState([]);

  // Update seatingPattern whenever rows or columns change
  useEffect(() => {
    const newPattern = Array.from({ length: rows }, () =>
      new Array(columns).fill(1)
    );
    setSeatingPattern(newPattern);
  }, [rows, columns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFootpath = () => {
    if (footpathInput && !footpaths.includes(footpathInput)) {
      setFootpaths([...footpaths, footpathInput].sort((a, b) => a - b));
      setFootpathInput("");
    }
  };

  const handleSeatClick = (rowIndex, colIndex) => {
    const updatedPattern = seatingPattern.map((row, rIndex) =>
      row.map((seat, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return seat === 1 ? 0 : 1;
        }
        return seat;
      })
    );
    setSeatingPattern(updatedPattern);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const completeData = {
        ...formData,
        seatingPattern,
        footpaths,
      };
      console.log("complete Data", completeData);
      await createTheatre(completeData);
      setFormData({
        name: "",
        capacity: "",
        ticketPrice: "",
        showTimes: [],
        location: "",
      });
      // Resetting seating pattern and footpaths
      setRows(0);
      setColumns(0);
      setFootpaths([]);
      setSeatingPattern([]);
      console.log("Theatre created successfully!");
    } catch (error) {
      console.error("Error creating theatre:", error);
    }
  };

  // Render combined form
  return (
    <Box sx={{ margin: "auto" }}>
      <form onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
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
          </Grid>
          {/* Theatre details inputs */}
          {/* Existing inputs for name, capacity, etc. here */}
          {/* Additional inputs for seating configuration */}
          <Grid item xs={12}>
            <TextField
              label="Rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Columns"
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Footpath After Column"
              type="number"
              value={footpathInput}
              onChange={(e) => setFootpathInput(Number(e.target.value))}
            />
            <Button onClick={handleAddFootpath}>Add Footpath</Button>
            {footpaths.map((path, index) => (
              <Chip
                key={index}
                label={`Path after ${path}`}
                onDelete={() => {
                  setFootpaths(footpaths.filter((fp) => fp !== path));
                }}
              />
            ))}
          </Grid>
          {/* Seating pattern visualization and editing */}
          <Grid container spacing={1}>
            {seatingPattern.map((row, rowIndex) => (
              <Grid item xs={12} key={rowIndex}>
                <Grid container justifyContent="center" spacing={1}>
                  {row.map((seat, colIndex) => (
                    <Grid
                      item
                      key={colIndex}
                      style={{
                        marginRight: footpaths.includes(colIndex + 1)
                          ? "16px"
                          : undefined,
                      }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          width: 15,
                          height: 15,
                          backgroundColor: seat === 1 ? "blue" : "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSeatClick(rowIndex, colIndex)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ my: "10px" }}
        >
          Add Theatre
        </Button>
      </form>
    </Box>
  );
};

export default CombinedTheatreForm;
