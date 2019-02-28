const express = require("express");
const router = express.Router();

// /me -- AUTH
router.get("/", (req, res) => res.send("me"));

// /me/update-password -- AUTH
router.get("/update-password", (req, res) => res.send("update password"));

module.exports = router;
