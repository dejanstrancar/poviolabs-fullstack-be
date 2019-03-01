const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
require("./middlewares/passport")(passport);
const CONFIG = require("./config/config");

// Connect
let mongoUri = CONFIG.MongoURI;
if (CONFIG.environment === "test") mongoUri = CONFIG.MongoTestURI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Middleware
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/index"));
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/me", require("./routes/me"));
app.use("/user", require("./routes/user"));
app.use("/most-liked", require("./routes/most-liked"));

// Run
if (CONFIG.environment != "test") {
  app.listen(CONFIG.port, () =>
    console.log(`Example app listening on port ${CONFIG.port}`)
  );
}

// For test purposes
module.exports = app;
