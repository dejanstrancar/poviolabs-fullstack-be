module.exports = (app, db) => {
  //auth
  app.get("/me", (req, res) => {
    res.send("Signup!");
  });

  //auth
  app.get("/me/update-password", (req, res) => {
    res.send("Signup!");
  });
};
