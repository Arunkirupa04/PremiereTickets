import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const SuccessPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/booking/success", {
        seatNumbers: "A1, A2, A3",
        showId: "123456",
        seatCount: 3,
        userEmail: "arun@gmail.com",
        userName: "John Doe",
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.success && response.data.qrCodeUrl) {
          setQrCodeUrl(response.data.qrCodeUrl);
          setEmailStatus("Confirmation email sent successfully.");
        } else {
          setErrorMessage(
            "Failed to complete the booking process: " + response.data.message
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMsg = error.response?.data?.message || error.message;
        setErrorMessage("An error occurred: " + errorMsg);
        console.error("Error in booking process:", error);
      });
  }, []);

  return (
    <Box sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="subtitle1">Here is your QR Code:</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" style={{ margin: "20px" }} />
      ) : (
        <Typography variant="body2" color="error">
          {errorMessage || "Error: QR Code not available."}
        </Typography>
      )}
      <Typography variant="subtitle2" color="textSecondary">
        {emailStatus}
      </Typography>
    </Box>
  );
};

export default SuccessPage;
