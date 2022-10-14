const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

con.connect((err) => {
  if (err) {
    console.log("couldnot connect database");
  } else {
    console.log("Successfully connect to database");
  }
});
con.end();

module.exports = con;
