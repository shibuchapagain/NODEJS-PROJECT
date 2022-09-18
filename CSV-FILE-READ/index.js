const express = require("express");
const fs = require("fs");
const csv = require("csvtojson");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");

// csv()
//   .fromFile("Sample500.csv")
//   .then((result) => {
//     fs.writeFile("sample.json", JSON.stringify(result), "utf-8", (err) => {
//       console.log(`ERROR: ${err}`);
//     });
//   });

let personString = fs.readFileSync("./sample.json", "utf-8");
let persons = JSON.parse(personString);

app.get("/:id", (req, res) => {
  if (req.params.id <= 0) {
    res.send("SORRY, NO DATA AVAILABLE ... please search using page number");
  }
  res.render("index", { persons, id: req.params.id });
});

app.listen(8000, () => {
  console.log("server at 8000");
});
