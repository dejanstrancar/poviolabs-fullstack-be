const express = require("express");
const app = express();
const port = 3000;

const db = {};

app.get("/", (req, res) => {
  res.send("Hello world!");
});

require("./routes/me")(app, db);
require("./routes/login")(app, db);
require("./routes/signup")(app, db);
require("./routes/user")(app, db);
require("./routes/most-liked")(app, db);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
