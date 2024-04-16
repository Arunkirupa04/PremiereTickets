import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const BookingSummary = () => {
  const seats = useSelector((state) => state.seats);
  const theatre = useSelector((state) => state.theatre);
  const navigate = useNavigate(); // Create an instance of useNavigate

  const handlePaymentNavigation = () => {
    navigate("/payment"); // Adjust '/payment' to the correct path for your payment page
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        bgcolor: "background.paper",
        borderLeft: "1px solid grey",
      }}
    >
      <Typography variant="h5">Booking Summary</Typography>
      <Typography variant="body1">
        Ticket Price: ${theatre.ticketPrice}
      </Typography>
      <Typography variant="body1">Count: {seats.count}</Typography>
      <Typography variant="body1">
        Total Amount: ${theatre.ticketPrice * seats.count}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePaymentNavigation} // Add an onClick event handler
      >
        Proceed to Payment
      </Button>
    </Box>
  );
};

export default BookingSummary;
