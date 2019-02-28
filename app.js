const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const db = {};

// Routes
app.use("/", require("./routes/index"));
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/me", require("./routes/me"));
app.use("/user", require("./routes/user"));
app.use("/most-liked", require("./routes/most-liked"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
