const express = require("express");
const router = express.Router();
const passport = require("passport");

const userHelper = require("../helpers/userHelper");

const getRequestedUser = async (req, res) => {
  const userId = req.params.id;
  user = await userHelper.getUser(userId, res);
  return user;
};

// /user/:id
router.get("/:id", async (req, res) => {
  user = await getRequestedUser(req, res);

  return res.json({
    success: "true",
    user: { username: user.username, likes: user.numberOfLikes }
  });
});

// /user/:id/like -- AUTH
router.get(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const requestUserId = req.user._id.toString();
    user = await getRequestedUser(req, res);

    if (user.likedBy.includes(requestUserId))
      return res.status(400).json({ error: "Already liked." });

    user.likedBy.push(req.user._id);
    user.save();

    return res.json({ success: "true" });
  }
);

// /user/:id/unlike -- AUTH
router.get(
  "/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const requestUserId = req.user._id.toString();
    user = await getRequestedUser(req, res);

    if (!user.likedBy.includes(requestUserId))
      return res.status(400).json({ error: "Never Liked." });

    user.likedBy = user.likedBy.filter(liked => liked !== requestUserId);
    user.save();

    return res.json({ success: "true" });
  }
);

module.exports = router;
