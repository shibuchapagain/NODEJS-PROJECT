const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("HI, THERE");
});

app.listen(8000, () => {
  console.log("SERVER AT 8000");
});
