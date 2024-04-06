const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const admin = require("../backend/routes/admin");
const auth = require("../backend/routes/auth");
const theatre = require("../backend/routes/theatre");
const show = require("../backend/routes/show");
const movie = require("../backend/routes/movie");
const booking = require("../backend/routes/booking");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use("/api", auth);
app.use("/api", admin);
app.use("/api/theatre", theatre);
app.use("/api/movie", movie);
app.use("/api/booking", booking);

app.use(errorMiddleware);
app.set("trust proxy", 1);

module.exports = app;
