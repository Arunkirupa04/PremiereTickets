import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Divider, Grid, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

const BookingSummary = () => {
  const seats = useSelector((state) => state.seats);
  const theatre = useSelector((state) => state.theatre);

  // Helper function to convert row number to corresponding letter
  const getRowLetter = (rowNumber) => String.fromCharCode(65 + rowNumber);

  // Function to create a string of seat descriptions
  const seatDescriptions = seats.selectedSeats
    .map((seat) => `${getRowLetter(seat.row)}${seat.col + 1}`)
    .join(", ");

  useEffect(() => {
    console.log(seats);
  }, []);
  return (
    <Box
      sx={{
        p: 2,
        height: "85%",
        border: "1px solid",
        borderRadius: "6px",
        bgcolor: grey[100],
        borderColor: grey[500],
        position: "relative",
      }}
    >
      <Typography variant="h6">Booking Summary</Typography>
      <Divider sx={{ marginY: "10px", borderColor: grey[500] }} />
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography
            variant="subtitle2"
            color={grey[700]}
            sx={{ fontWeight: 300 }}
          >
            Seats
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box variant="subtitle2" color={grey[700]} sx={{ fontWeight: 300 }}>
            {seatDescriptions}
          </Box>
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="subtitle2"
            color={grey[700]}
            sx={{ fontWeight: 300 }}
          >
            Ticket Price
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="subtitle2"
            color={grey[700]}
            sx={{ fontWeight: 300 }}
          >
            {theatre.ticketPrice} LKR
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Typography
            variant="subtitle2"
            color={grey[700]}
            sx={{ fontWeight: 300 }}
          >
            Count
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="subtitle2"
            color={grey[700]}
            sx={{ fontWeight: 300 }}
          >
            {seats.count}
          </Typography>
        </Grid>
      </Grid>
      <Stack
        width={"90%"}
        direction={"row"}
        justifyContent="space-between"
        sx={{
          borderTop: "1px solid",
          borderColor: grey[500],
          position: "absolute",
          bottom: 20,
          pt: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          color={grey[900]}
          sx={{ fontWeight: 500 }}
        >
          Total Amount
        </Typography>
        <Typography
          variant="subtitle2"
          color={grey[900]}
          sx={{ fontWeight: 500 }}
        >
          {theatre.ticketPrice * seats.count} LKR
        </Typography>
      </Stack>
    </Box>
  );
};

export default BookingSummary;
