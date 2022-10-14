// import express from 'express';
const express = require("express");
const app = express();
const port = process.env.PORT || "8000";
// import web from './routes/web.js';
const web = require("./routes/web");

app.set("view engine", "ejs");
app.use("/", web);

app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
