const express = require("express");
const router = express.Router();
const app = express;
const database = require("./config");

router.get("/", (req, res) => {
  let query = `select * from student`;
  database.query(query, (err, data) => {
    if (err) {
      console.log(error);
    } else {
      res.render("records", { data });
    }
  });
});

module.exports = router;
