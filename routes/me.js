const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const SchemaValidator = require("../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const userHelper = require("../helpers/userHelper");
// /me -- AUTH
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    user = await userHelper.getUser(req.user._id.toString(), res);

    return res.json({
      success: "true",
      user: {
        username: user.username
      }
    });
  }
);

// /me/update-password -- AUTH
router.post(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  validateRequest,
  async (req, res) => {
    user = await userHelper.getUser(req.user._id.toString(), res);

    user.password = req.body.password;
    await user.save();

    return res.json({
      success: "true",
      message: "Password updated."
    });
  }
);

module.exports = router;
