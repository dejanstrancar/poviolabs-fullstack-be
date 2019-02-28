const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("me"));
router.get("/update-password", (req, res) => res.send("update password"));

module.exports = router;
