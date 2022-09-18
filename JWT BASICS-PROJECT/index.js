const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routed
const authRouter = require("./routes/auth");
const postRoute = require("./routes/post");
const app = express();

dotenv.config();
// connect to DB
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connect to db");
});

// middleware
app.use(express.json());

// route middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postRoute);

app.listen(8000, () => {
  console.log("Server at 8000");
});
