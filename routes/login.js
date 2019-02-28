const express = require("express");
const router = express.Router();

// /login
router.get("/", (req, res) => res.send("Login"));

module.exports = router;
