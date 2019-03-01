const express = require("express");
const router = express.Router();
const SchemaValidator = require("../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const User = require("../models/User");

// /signup
router.post("/", validateRequest, async (req, res) => {
  const { username, password } = req.body;

  existingUser = await User.findOne({ username: username });
  if (existingUser) {
    res.status(422).json({ error: "user exists" });
    return;
  }

  const newUserRef = new User({
    username,
    password
  });

  try {
    const newUser = await newUserRef.save();
    res.json({ userId: newUser._id });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
