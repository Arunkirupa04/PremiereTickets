import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import TheatreBar from "./theatrebar";
import DisclaimerList from "./disclaimerlist";
import BookingSummary from "./bookingSummary";
import ContactDetails from "./otpVarification"; // Make sure to import ContactDetails
import { grey } from "@mui/material/colors";

const DisclaimerPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control the dialog

  // Function to close the dialog
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container>
      <Box
        sx={{
          bgcolor: grey[300],
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <TheatreBar />
        <Box sx={{ display: "flex", width: "100%" }}>
          <Grid md={8.5} sx={{ margin: "20px 0 20px 20px " }}>
            <DisclaimerList />
          </Grid>
          <Grid md={3.5} sx={{ m: "20px" }}>
            <BookingSummary />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setDialogOpen(true)}
            >
              Proceed To payment{" "}
            </Button>
          </Grid>
        </Box>
        <ContactDetails open={isDialogOpen} handleClose={handleClose} />
      </Box>
    </Grid>
  );
};

export default DisclaimerPage;
