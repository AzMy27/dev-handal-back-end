const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ReviewController = require("../controllers/review");
const router = express.Router({ mergeParams: true });
const isValidObject = require("../middlewares/isValidObject");
const isAuth = require("../middlewares/isAuth");
const { isAuthorReview } = require("../middlewares/isAuthor");
const { validateReview } = require("../middlewares/validator");

router.post("/", isAuth, isValidObject("/places"), validateReview, wrapAsync(ReviewController.store));

router.delete("/:review_id", isAuth, isAuthorReview, isValidObject("/places"), wrapAsync(ReviewController.destroy));

module.exports = router;
