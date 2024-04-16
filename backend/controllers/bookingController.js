const Booking = require("../models/bookingModel.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const QRCode = require("qrcode");

// Function to create a new booking
exports.createBooking = catchAsyncError(async (req, res) => {
  const { theatre, show, user, seatNumbers } = req.body;
  const booking = await Booking.create({ theatre, show, user, seatNumbers });
  res.status(201).json({ success: true, data: booking });
});

// Function to delete a booking by ID
exports.deleteBooking = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) {
    return res.status(404).json({ success: false, error: "Booking not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

// Function to get all bookings
exports.getAllBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json({ success: true, data: bookings });
});

// controllers.js
const stripe = require("stripe")(
  "sk_test_51P4oPJ1OuO8iFaOrcgSLhYoxbeIDJeFxmRhLAiTkuJKLWNC8Q7bKm26jJKUkqDeeeOy7YKgaaTWncxIWoiyvRvvm004L2RmWXx"
);

// Fetch Stripe account details
exports.getAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await stripe.accounts.retrieve(accountId);
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new Stripe account
exports.createAccount = async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a Stripe checkout session
exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    res.status(201).json({ sessionId: session.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Payment handler for Stripe charges
exports.processPayment = catchAsyncError(async (req, res) => {
  const { token, amount } = req.body; // ensure you're receiving the correct params
  const charge = await stripe.charges.create({
    amount: amount,
    currency: "usd",
    source: token,
    description: "Payment for nothing",
  });

  if (charge) {
    res
      .status(201)
      .json({ success: true, message: "Payment successful", charge });
  } else {
    res.status(400).json({ success: false, message: "Payment failed" });
  }
});

//To generate QR codes
// exports.generateQR = catchAsyncError(async (req, res) => {
//   const { seatNumbers, showId, seatCount } = req.body;

//   const data = JSON.stringify({ seatNumbers, showId, seatCount });
//   const qrCodeUrl = await QRCode.toDataURL(data);
//   res.json({ success: true, qrCodeUrl });
// });

const sendEmail = require("../utils/email.js");

// exports.EmailFunction = catchAsyncError(async (req, res) => {
//   const { userEmail, userName } = req.body; // Assuming these details are passed from the frontend

//   try {
//     // Example: other logic to handle payment confirmation

//     // Send confirmation email
//     await sendEmail({
//       email: userEmail,
//       subject: "Your Payment Confirmation",
//       message: `Hi ${userName}, your payment was successful!`,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Payment successful and confirmation email sent!",
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({
//       success: false,
//       message: "Payment was successful, but the email could not be sent.",
//     });
//   }
// });

exports.handlePaymentSuccess = catchAsyncError(async (req, res) => {
  const { userEmail, userName, seatNumbers, showId, seatCount } = req.body;

  try {
    // Generate QR code
    const data = JSON.stringify({ seatNumbers, showId, seatCount });
    const qrCodeUrl = await QRCode.toDataURL(data);

    // Email content
    const message = `Dear ${userName},\n\nYour ticket(s) are Confirmed!\n\nScan below QR in counter to get tickets.`;
    console.log("Sending email to:", userEmail);

    // Send confirmation email with QR code
    await sendEmail({
      email: userEmail,
      subject: "Your Payment Confirmation",
      message: message,
      attachments: [
        {
          filename: "ticket-qrcode.png",
          content: qrCodeUrl.split(",")[1], // taking the base64 encoded part
          encoding: "base64",
          cid: "qrcode",
        },
      ],
    });

    res.status(200).json({
      success: true,
      qrCodeUrl,
      message: "Payment successful and confirmation email sent with QR code!",
    });
  } catch (error) {
    console.error("Error during payment process:", error);
    res.status(500).json({
      success: false,
      message: "Payment was successful, but the email could not be sent.",
    });
  }
});
