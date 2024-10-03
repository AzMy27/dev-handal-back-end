const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const wrapAsync = require("../utils/wrapAsync");
const Place = require("../models/place");
const { placeSchema } = require("../schemas/place");
const router = express.Router();
const isValidObject = require("../middlewares/isValidObject");
const isAuth = require("../middlewares/isAuth");

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

router.post(
  "/",
  isAuth,
  validatePlace,
  wrapAsync(async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash("success_msg", "Place add successfully");
    res.redirect("/places");
  })
);

router.get(
  "/:id",
  isValidObject("/places"),
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id).populate("reviews");
    res.render("places/show", { place });
  })
);

router.get(
  "/:id/edit",
  isAuth,
  isValidObject("/places"),
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

router.put(
  "/:id",
  isAuth,
  isValidObject("/places"),
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, {
      ...req.body.place,
    });
    req.flash("success_msg", "Place add successfully");
    res.redirect(`/places/${req.params.id}`);
  })
);

router.delete(
  "/:id",
  isAuth,
  isValidObject("/places"),
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect("/places");
  })
);

module.exports = router;
