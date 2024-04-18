const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const {
  addNewAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.route("/admin/register").post(isAuthenticatedUser, addNewAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").post(logoutAdmin);

module.exports = router;
