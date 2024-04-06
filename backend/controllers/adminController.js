const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const { log } = require("console");

exports.addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, avatar } = req.body;
  // Check if admin with the provided email already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res
      .status(400)
      .json({ success: false, message: "Email already registered" });
  }
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendToken(admin, 201, res);
});

exports.loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password"));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return next(new ErrorHandler("Invalid username or password"));
  }

  if (!(await admin.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid email or password"));
  }

  sendToken(admin, 201, res);
});

exports.logoutAdmin = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "LoggedOut",
    });
};
