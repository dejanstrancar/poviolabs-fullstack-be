const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/passport")(passport);

// /user/:id
router.get("/:id", (req, res) => {
  res.send("Get user by id!");
});

// /user/:id/like -- AUTH
router.get(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("like user!");
  }
);

// /user/:id/unlike -- AUTH
router.get(
  "/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("unlike user!");
  }
);

module.exports = router;
