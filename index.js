const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/signup", (req, res) => {
  res.send("Signup!");
});

app.get("/login", (req, res) => {
  res.send("Signup!");
});

//auth
app.get("/me", (req, res) => {
  res.send("Signup!");
});

//auth
app.get("/me/update-password", (req, res) => {
  res.send("Signup!");
});

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

app.get("/most-liked", (req, res) => {
  res.send("Signup!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
