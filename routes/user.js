module.exports = (app, db) => {
  app.get("/user/:id", (req, res) => {
    res.send("Signup!");
  });

  //auth
  app.get("/user/:id/like", (req, res) => {
    res.send("Signup!");
  });

  //auth
  app.get("/user/:id/unlike", (req, res) => {
    res.send("Signup!");
  });
};
