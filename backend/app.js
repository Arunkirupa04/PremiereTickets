const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const auth = require("./routes/auth");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

// app.use("/api", products);
app.use("/api", auth);
// app.use("/api", chat);
// app.use("/api", cart);

app.use(errorMiddleware);
app.set("trust proxy", 1);

module.exports = app;
