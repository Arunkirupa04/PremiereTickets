import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Reducers/userSlice";
import { useNavigate } from "react-router-dom";

const ContactDetails = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log("Sending OTP...");
    axios
      .post("http://localhost:5000/api/sendotp", {
        phoneNumber: phone,
      })
      .then((response) => {
        console.log("OTP sent successfully:", response.data);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleVerifyOtp = () => {
    const parsedOtp = parseInt(otp, 10);
    if (!isNaN(parsedOtp)) {
      axios
        .post("http://localhost:5000/api/verifyotp", {
          otp: parsedOtp,
          phoneNumber: phone,
        })
        .then((response) => {
          console.log("OTP verified successfully:", response.data);
          alert("OTP verified successfully!");
          handleClose();
          console.log(email, phone);
          dispatch(setUser({ email, phone }));
          navigate("/payment"); // Adjust '/payment' to the correct path for your payment page
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          alert("Error verifying OTP: " + error.response.data.message);
        });
    } else {
      alert("Invalid OTP format. Please enter a valid number.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User Information</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {otpSent && (
          <TextField
            margin="dense"
            label="Enter OTP"
            type="text"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        {!otpSent ? (
          <Button onClick={handleSendOtp}>Send OTP</Button>
        ) : (
          <Button onClick={handleVerifyOtp}>Verify OTP</Button>
        )}
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDetails;
