const express = require("express");
const router = express.Router();

// /signup
router.get("/", (req, res) => res.send("Signup"));

module.exports = router;
