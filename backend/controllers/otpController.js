const catchAsyncError = require("../middlewares/catchAsyncError");
const twilio = require("twilio");

const accountSid = "AC7d0aaf53257b7dbb208993f8a13a668f";
const authToken = "65847e950240bf8faab7084d6da6121d";
const client = new twilio(accountSid, authToken);

// Simple in-memory store
const otpStorage = {};

exports.sendOTP = catchAsyncError(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const message = `Your OTP is: ${otp}`;

  try {
    const messageResult = await client.messages.create({
      body: message,
      to: phoneNumber, // Text this number
      from: "+16592011126", // From a valid Twilio number
    });

    // Store the OTP along with a timestamp
    otpStorage[phoneNumber] = {
      otp: otp,
      timestamp: new Date().getTime(), // Store timestamp of when OTP was generated
    };

    console.log(messageResult.sid);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
});

exports.verifyOTP = catchAsyncError(async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  console.log("phone no :", phoneNumber, "otp", otp);
  if (otpStorage[phoneNumber] && otpStorage[phoneNumber].otp === otp) {
    const otpTimestamp = otpStorage[phoneNumber].timestamp;
    const currentTime = new Date().getTime();

    if (currentTime - otpTimestamp < 300000) {
      // 300000 milliseconds = 5 minutes
      res.json({ success: true, message: "OTP verified successfully." });
    } else {
      res.status(400).json({ success: false, message: "OTP has expired." });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP." });
  }
});
