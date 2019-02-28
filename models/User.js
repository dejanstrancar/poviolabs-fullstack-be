const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  likes: Number,
  dateCreated: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
