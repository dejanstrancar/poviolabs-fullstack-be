const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");
const SchemaValidator = require("../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

// /login
router.post("/", validateRequest, async (req, res) => {
  const { username, password } = req.body;

  try {
    user = await User.findOne({ username });

    if (!user) {
      return res.status(422).json({ error: "No Account Found" });
    }

    passwordMatch = await user.verifyPassword(password);

    if (!passwordMatch)
      res.status(422).json({ error: "Password does not match" });

    jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      CONFIG.jwt_encryption,
      { expiresIn: CONFIG.jwt_expiration },
      (err, token) => {
        if (err)
          res.status(500).json({ error: "Error signing token", raw: err });
        res.json({
          user: {
            name: user.username,
            liked: user.liked
          },
          token: `Bearer ${token}`
        });
      }
    );
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

module.exports = router;
