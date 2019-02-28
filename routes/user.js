const express = require("express");
const router = express.Router();

// /user/:id
router.get("/:id", (req, res) => {
  res.send("Get user by id!");
});

// /user/:id/like -- AUTH
router.get("/:id/like", (req, res) => {
  res.send("like user!");
});

// /user/:id/unlike -- AUTH
router.get("/:id/unlike", (req, res) => {
  res.send("unlike user!");
});

module.exports = router;
