const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("Connected MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// models
const Place = require("./models/place");

const port = 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/seed/place", async (req, res) => {
  const place = new Place({
    title: "State Empire",
    price: "$1000",
    location: "Konoha, KNH",
    description: "Mulyono punya",
  });
  await place.save();
  res.send(place);
});

app.listen(port, () => {
  console.log(
    `Server is running on http://127.0.0.1:${port}`
  );
});
