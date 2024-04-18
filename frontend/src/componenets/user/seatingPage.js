import React, { useState, useEffect } from "react";
import { fetchSeatingPattern, getShow } from "../../actions/user/showsAction";
import { Paper, Box, Grid, Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectSeat } from "../../Reducers/seatInfoSlice";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

const SeatingPage = () => {
  const [seatingPattern, setSeatingPattern] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [footpaths, setFootpaths] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);

  const show = useSelector((state) => state.show);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theatreId } = location.state || {};

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

    const fetchShowDetail = async () => {
      const showDetail = await getShow(show.showId);
      if (showDetail) {
        console.log("sd", showDetail.data.bookedSeats);
        setBookedSeats(showDetail.data.bookedSeats);
      } else {
        console.log("No seating pattern received or there was an error.");
      }
    };

    fetchShowDetail();
  }, [theatreId]);

  const toggleSeatSelection = (rowIndex, colIndex) => {
    // Check if the seat is booked or if it is not a valid seat
    const isBooked = bookedSeats.some(
      (bookedSeat) => bookedSeat.row === rowIndex && bookedSeat.col === colIndex
    );

    // Only proceed if the seat is not booked and is a valid seat (assuming seat value 1 indicates a valid seat)
    if (!isBooked && seatingPattern[rowIndex][colIndex] === 1) {
      const updatedSelection = [...selectedSeats];
      const seatIndex = updatedSelection.findIndex(
        (seat) => seat.row === rowIndex && seat.col === colIndex
      );

      if (seatIndex >= 0) {
        updatedSelection.splice(seatIndex, 1);
      } else {
        updatedSelection.push({ row: rowIndex, col: colIndex });
      }

      console.log(updatedSelection);
      setSelectedSeats(updatedSelection);
      setSelectedSeatCount(updatedSelection.length); // Update seat count
      dispatch(
        selectSeat({ seats: updatedSelection, count: updatedSelection.length })
      );
    }
  };

  const isSeatSelected = (rowIndex, colIndex) => {
    return selectedSeats.some(
      (seat) => seat.row === rowIndex && seat.col === colIndex
    );
  };

  const getRowLabel = (rowIndex) => {
    return String.fromCharCode(65 + rowIndex);
  };

  const handleProceedClick = () => {
    navigate("/disclaimer");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: grey[300],
      }}
    >
      <Navbar />
      <Stack my={2}>Select Your Seats</Stack>
      <Paper elevation={3} sx={{ my: "20px", minHeight: "60vh" }}>
        {seatingPattern.length > 0 ? (
          <Grid container justifyContent="center" my="40px" gap={0.4}>
            {seatingPattern.map((row, rowIndex) => (
              <Grid
                item
                xs={12}
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paper
                  elevation={0}
                  style={{ width: 30, textAlign: "center", m: "4px" }}
                >
                  {getRowLabel(rowIndex)}
                </Paper>
                {row.map((seat, colIndex) => (
                  <Paper
                    elevation={isSeatSelected(rowIndex, colIndex) ? 3 : 0}
                    key={colIndex}
                    style={{
                      width: 22,
                      height: 22,
                      border: "solid 1px",
                      borderColor: seat === 1 ? "grey" : "transparent",
                      backgroundColor: bookedSeats.some(
                        (bookedSeat) =>
                          bookedSeat.row === rowIndex &&
                          bookedSeat.col === colIndex
                      )
                        ? "red" // Color for booked seats
                        : isSeatSelected(rowIndex, colIndex)
                        ? "lightblue"
                        : "transparent",
                      marginRight: footpaths.includes(colIndex + 1)
                        ? "16px"
                        : "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleSeatSelection(rowIndex, colIndex)}
                  >
                    {seat === 1 ? colIndex + 1 : ""}
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
