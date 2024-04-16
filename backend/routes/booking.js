const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const {
  getAccount,
  createAccount,
  createCheckoutSession,
} = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.delete("/:id", bookingController.deleteBooking);
router.get("/", bookingController.getAllBookings);
// router.post("/payment", bookingController.Payment);

router.get("/account/:accountId", getAccount);
router.post("/account", createAccount);
router.post("/payment", bookingController.processPayment);
router.post("/checkout", createCheckoutSession);
router.post("/success", bookingController.handlePaymentSuccess);
// router.post("/email", bookingController.EmailFunction);

module.exports = router;
