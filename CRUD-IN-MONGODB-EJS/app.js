const express = require("express");
const dbConnect = require("./MONGO/mongodb");

const app = express();
app.use("view engine", "ejs");
app.use(express.json());

app.get("/", async (req, res) => {
  let result = await dbConnect();
  let data = await result.find().toArray();
  res.send(data);
});

app.post("/", async (req, res) => {
  let result = await dbConnect();
  let data = await result.insertOne(req.body);
  console.log(data);
  res.send(data);
});

app.patch("/:name", async (req, res) => {
  let result = await dbConnect();
  let data = await result.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send(data);
});

app.delete("/:name", async (req, res) => {
  let result = await dbConnect();
  let data = await result.deleteOne({ name: req.params.name });
  res.send(data);
});

app.listen(5000, () => {
  console.log("SERVER IS RUNNING AT PORT 5000");
});
