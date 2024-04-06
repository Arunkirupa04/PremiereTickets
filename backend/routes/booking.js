const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.delete("/:id", bookingController.deleteBooking);
router.get("/", bookingController.getAllBookings);

module.exports = router;