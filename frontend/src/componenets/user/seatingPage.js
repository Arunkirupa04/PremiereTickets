import React, { useState, useEffect } from "react";
import { fetchSeatingPattern } from "../../actions/user/showsAction";
import { Paper, Box, Grid, Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectSeat } from "../../Reducers/seatInfoSlice";

const SeatingPage = () => {
  const [seatingPattern, setSeatingPattern] = useState([]);
  const [footpaths, setFootpaths] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Create history instance
  const location = useLocation();
  const { theatreId } = location.state || {}; // Destructure `theatreId` from state, provide empty object as fallback

  //   const theatreId = "6618bcf3b75690ac09a8ae17";

  useEffect(() => {
    const fetchPattern = async () => {
      const patternData = await fetchSeatingPattern(theatreId);
      if (patternData) {
        setSeatingPattern(patternData.seatingPattern);
        setFootpaths(patternData.footpaths);
      } else {
        console.log("No seating pattern received or there was an error.");
      }
    };

    fetchPattern();
  }, [theatreId]);

  // Toggle seat selection
  const toggleSeatSelection = (rowIndex, colIndex) => {
    const updatedSelection = [...selectedSeats];
    const seatIndex = updatedSelection.findIndex(
      (seat) => seat.row === rowIndex && seat.col === colIndex
    );
    if (seatIndex >= 0) {
      // Seat already selected, remove it
      updatedSelection.splice(seatIndex, 1);
    } else {
      // Seat not selected, add it
      updatedSelection.push({ row: rowIndex, col: colIndex });
    }
    setSelectedSeats(updatedSelection);
    dispatch(selectSeat(updatedSelection));

    console.log(updatedSelection);
  };

  // Check if seat is selected
  const isSeatSelected = (rowIndex, colIndex) => {
    return selectedSeats.some(
      (seat) => seat.row === rowIndex && seat.col === colIndex
    );
  };

  // Convert row index to an alphabet label
  const getRowLabel = (rowIndex) => {
    return String.fromCharCode(65 + rowIndex);
  };

  const handleProceedClick = () => {
    // Navigate to the payment page
    navigate("/payment");
  };
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack my={2}>Select Your Seats</Stack>
      <Paper elevation={3} sx={{ my: "20px" }}>
        {seatingPattern.length > 0 ? (
          <Grid container justifyContent="center" my="40px">
            {seatingPattern.map((row, rowIndex) => (
              <Grid
                item
                xs={12}
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  style={{ width: 30, textAlign: "center", marginRight: "4px" }}
                >
                  {getRowLabel(rowIndex)}
                </Paper>
                {row.map((seat, colIndex) => (
                  <Paper
                    elevation={isSeatSelected(rowIndex, colIndex) ? 3 : 0}
                    key={colIndex}
                    style={{
                      width: 25,
                      height: 25,
                      border: "solid 1px",
                      borderColor: seat == 1 ? "grey" : "transparent",
                      backgroundColor: isSeatSelected(rowIndex, colIndex)
                        ? "lightblue"
                        : "transparent",
                      marginRight: footpaths.includes(colIndex + 1)
                        ? "16px"
                        : "4px",
                      marginBottom: "4px",
                      cursor: "pointer",
                      color: seat == 1 ? "grey[500]" : "transparent",
                    }}
                    onClick={() => toggleSeatSelection(rowIndex, colIndex)}
                  >
                    {colIndex + 1}
                  </Paper>
                ))}
              </Grid>
            ))}
            <Box
              sx={{
                backgroundColor: grey[300],
                px: "40px",
                py: "2px",
                my: "5px",
                borderRadius: "6px",
              }}
            >
              Screen
            </Box>
          </Grid>
        ) : (
          <p>No seating pattern available.</p>
        )}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleProceedClick}
        sx={{ mt: 2 }}
      >
        Proceed
      </Button>
    </Box>
  );
};

export default SeatingPage;
