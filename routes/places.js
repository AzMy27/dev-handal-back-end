const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const PlaceController = require("../controllers/places");
const router = express.Router();
const isValidObject = require("../middlewares/isValidObject");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const { validatePlace } = require("../middlewares/validator");

router.route("/").get(wrapAsync(PlaceController.index)).post(isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

router
  .route("/:id")
  .get(isValidObject("/places"), wrapAsync(PlaceController.show))
  .put(isAuth, isAuthorPlace, isValidObject("/places"), validatePlace, wrapAsync(PlaceController.update))
  .delete(isAuth, isAuthorPlace, isValidObject("/places"), wrapAsync(PlaceController.destroy));

router.get("/:id/edit", isAuth, isAuthorPlace, isValidObject("/places"), wrapAsync(PlaceController.edit));

module.exports = router;
