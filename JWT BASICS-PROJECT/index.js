const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routed
const authRouter = require("./routes/auth");
const postRoute = require("./routes/post");
const app = express();

dotenv.config();

// connect to DB
// mongoose.connect(process.env.DB_CONNECT, () => {
//   console.log("connect to db");
// });

mongoose
  .connect(
    `mongodb+srv://shiva:shiva123@cluster0.iajo8.mongodb.net/authdb?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB CONNECT"))
  .catch((err) => console.log(`ERROR: ${err}`));

// middleware
app.use(express.json());

// route middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postRoute);

app.listen(8000, () => {
  console.log("Server at 8000");
});
