const express = require("express");

const router = require("./routes/userRoute");
const app = express();
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("SERVER AT 8000");
});
