const axios = require("axios");
const ejs = require("ejs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");

exports.records = (req, res) => {
  axios
    .get(`http://127.0.0.1:8000/`)
    .then(function (response) {
      response.render("records", { users: response });
    })
    .catch(function (error) {
      console.log("error");
    })
    .then(function () {});
};
