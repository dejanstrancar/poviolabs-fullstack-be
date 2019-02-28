module.exports = (app, db) => {
  app.get("/signup", (req, res) => {
    res.send("Signup!");
  });
};
