const express = require("express");
const router = express.Router();
const User = require("../models/User");

// /most-liked
router.get("/", async (req, res) => {
  users = await User.find({}).sort([["numberOfLikes", "descending"]]);
  users = users.map(user => user.username);
  return res.json({
    success: "true",
    users
  });
});

module.exports = router;
