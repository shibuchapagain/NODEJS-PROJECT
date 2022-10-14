const express = require("express");
require("./config");
const user = require("./user");

const app = express();
app.use(express.json());

app.get("/list", async (req, res) => {
  let data = await user.find();
  //   console.log(data);
  res.send(data);
});

app.post("/create", async (req, res) => {
  let data = new user(req.body);
  let result = await data.save();
  //   console.log(result);
  res.send("ok");
});

app.patch("/update/:_id", async (req, res) => {
  let data = await user.updateOne({ _id: req.params }, { $set: req.body });
  //   console.log(data);
  res.send("ok");
});

app.delete("/delete/:_id", async (req, res) => {
  let data = await user.deleteOne({ _id: req.params });
  console.log(data);
  res.send("ok");
});

app.listen(8000, () => {
  console.log("SERVER IS RUNNING AT PORT 8000");
});
