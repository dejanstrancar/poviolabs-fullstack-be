const express = require("express");
const router = express.Router();

// /most-liked
router.get("/", (req, res) => res.send("Most liked"));

module.exports = router;
