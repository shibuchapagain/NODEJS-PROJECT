const express = require("express");
const app = express();
const ejs = require("ejs");

app.use(express.urlencoded());
// app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/getform2", (req, res) => {
  console.log(req.body);
  res.send("FROM POST METHOD");
});

app.listen(5000, () => {
  console.log("server at 8000");
});
