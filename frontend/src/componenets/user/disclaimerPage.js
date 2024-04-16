import React from "react";
import { Box } from "@mui/material";
import HeaderBar from "./theatrebar";
import DisclaimerList from "./disclaimerlist";
import BookingSummary from "./bookingSummary";

const DisclaimerPage = () => {
  return (
    <Box>
      <HeaderBar />
      <Box sx={{ display: "flex", width: "100%" }}>
        <DisclaimerList />
        <BookingSummary />
      </Box>
    </Box>
  );
};

export default DisclaimerPage;
