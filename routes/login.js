module.exports = (app, db) => {
  app.get("/login", (req, res) => {
    res.send("Signup!");
  });
};
