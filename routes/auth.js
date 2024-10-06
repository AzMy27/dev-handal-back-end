const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const isNotAuth = require("../middlewares/isNotAuth");
const AuthController = require("../controllers/auth");

router
  .route("/register")
  .get(isNotAuth, AuthController.registerForm)
  .post(isNotAuth, wrapAsync(AuthController.register));

router
  .route("/login")
  .get(isNotAuth, AuthController.loginForm)
  .post(
    isNotAuth,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: {
        type: "error_msg",
        msg: "Invalid Username or password",
      },
    }),
    AuthController.login
  );

router.post("/logout", AuthController.logout);

module.exports = router;
