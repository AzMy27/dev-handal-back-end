const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const PlaceController = require("../controllers/places.controller");
const router = express.Router();
const isValidObject = require("../middlewares/isValidObject");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const { validatePlace } = require("../middlewares/validator");
const upload = require("../config/multer");

router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  // .post(isAuth, upload.array("image", 5), (req, res) => {
  //   console.log(req.files);
  //   console.log(req.body);
  //   res.send("It works");
  // });
  .post(isAuth, upload.array("image", 5), validatePlace, wrapAsync(PlaceController.store));

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

router
  .route("/:id")
  .get(isValidObject("/places"), wrapAsync(PlaceController.show))
  .put(
    isAuth,
    isAuthorPlace,
    isValidObject("/places"),
    upload.array("image", 5),
    validatePlace,
    wrapAsync(PlaceController.update)
  )
  .delete(isAuth, isAuthorPlace, isValidObject("/places"), wrapAsync(PlaceController.destroy));

router.get("/:id/edit", isAuth, isAuthorPlace, isValidObject("/places"), wrapAsync(PlaceController.edit));

router.delete("/:id/images", isAuth, isAuthorPlace, isValidObject("/places"), wrapAsync(PlaceController.destroyImages));

module.exports = router;
