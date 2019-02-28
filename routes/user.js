const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send("Get user by id!");
});

router.get("/:id/like", (req, res) => {
  res.send("like user!");
});

router.get("/:id/unlike", (req, res) => {
  res.send("unlike user!");
});

module.exports = router;
