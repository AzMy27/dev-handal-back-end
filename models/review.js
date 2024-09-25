const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  rating: Number,
  body: String,
});

module.exports = mongoose.model(
  "Review",
  reviewsSchema
);
