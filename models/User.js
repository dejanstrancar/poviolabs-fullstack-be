const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likes: Number,
  dateCreated: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function(next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);

  return next();
});

UserSchema.methods = {
  verifyPassword: async function(password) {
    return await bcrypt.compare(password, this.password);
  }
};

try {
  module.exports = mongoose.model("User", UserSchema);
} catch (e) {
  module.exports = mongoose.model("User");
}
