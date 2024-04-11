import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Paper, Chip } from "@mui/material";

const SeatingPatternCreator = () => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [footpaths, setFootpaths] = useState([]);
  const [footpathInput, setFootpathInput] = useState("");
  const [seatingPattern, setSeatingPattern] = useState([]);

  useEffect(() => {
    const newPattern = Array.from({ length: rows }, () =>
      new Array(columns).fill(1)
    );
    setSeatingPattern(newPattern);
  }, [rows, columns]);

  const onPatternCreate = (seatingPattern, footpaths) => {
    console.log("seating pattern : ", seatingPattern);
    console.log("footpaths : ", footpaths);
  };
  const handleSeatClick = (rowIndex, colIndex) => {
    const updatedPattern = seatingPattern.map((row, rIndex) =>
      row.map((seat, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return seat === 1 ? 0 : 1; // Toggle seat presence
        }
        return seat;
      })
    );
    setSeatingPattern(updatedPattern);
  };

  const handleAddFootpath = () => {
    if (footpathInput && !footpaths.includes(footpathInput)) {
      setFootpaths([...footpaths, footpathInput].sort((a, b) => a - b));
      setFootpathInput("");
    }
  };

  return (
    <div>
      <TextField
        label="Rows"
        type="number"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
        required
      />
      <TextField
        label="Columns"
        type="number"
        value={columns}
        onChange={(e) => setColumns(Number(e.target.value))}
        required
      />
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
                      width: 30,
                      height: 30,
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => onPatternCreate(seatingPattern, footpaths)}
      >
        Save Seating Pattern
      </Button>
    </div>
  );
};

export default SeatingPatternCreator;
