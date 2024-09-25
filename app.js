const ejsMate = require("ejs-mate");
const express = require("express");
const methodOvverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const ErrorHandler = require("./utils/ErrorHandler");

const port = 3000;

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("Connected MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOvverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/places", require("./routes/places"));
app.use("/places/:place_id/reviews", require("./routes/review"));

app.all("*", (req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no Something Went Wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
