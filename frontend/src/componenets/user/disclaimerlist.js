import React from "react";
import { Box, Typography } from "@mui/material";

const disclaimerPoints = [
  "Please arrive at least 15 minutes before the show.",
  "No refunds or exchanges are allowed after purchase.",
  "Outside food and drinks are not allowed inside the theatre.",
  "Mobile phones should be silenced during the show.",
  "Recording the screen in any form is illegal and prohibited.",
  "The management reserves the right to refuse admission.",
  "Children aged below 5 years are not allowed for rated movies.",
  "Please keep your belongings safe. Management is not responsible for lost items.",
  "Tickets are valid only for the date and time shown.",
  "Please follow all safety and health guidelines during your visit.",
  "Ticket holder consents to security searches and checks.",
  "Enjoy the show and thank you for choosing our theatre!",
];

const DisclaimerList = () => {
  return (
    <Box sx={{ width: "66.66%", p: 2 }}>
      <Typography variant="h5">Important Information</Typography>
      {disclaimerPoints.map((point, index) => (
        <Typography key={index} variant="body1" sx={{ mt: 1 }}>
          {index + 1}. {point}
        </Typography>
      ))}
    </Box>
  );
};

export default DisclaimerList;
