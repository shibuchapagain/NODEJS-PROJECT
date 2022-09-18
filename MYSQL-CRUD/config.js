// for database ...
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

con.connect((err) => {
  if (!err) {
    console.log("Database Connect Successfully");
  } else {
    console.log("Couldnot connect to Database");
  }
});

module.exports = con;
