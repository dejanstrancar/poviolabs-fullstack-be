const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
  getUser: async (userId, res) => {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Wrong id." });

    user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "No user found." });
    return user;
  }
};
