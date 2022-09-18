const express = require("express");
const router = require("./routes/studentRoute");
const app = express();

// const render = require("./render");

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use("/", router);

// app.get("/record", (req, res) => {
//   res.render("records");
// });

// app.get("/create", (req, res) => {
//   console.log(req.body);
//   res.render("create");
// });

// app.post("/records", (req, res) => {
//   res.send("Done Successfully");
// });

// app.get("/", (req, res) => {
//   con.query("select * from student", (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   con.query(`select * from student WHERE id= ${id}`, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.post("/", (req, res) => {
//   const check = req.body.name && req.body.email && req.body.address;
//   if (check) {
//     con.query("INSERT INTO student SET?", req.body, (err, data) => {
//       if (err) {
//         res.send("Couldnot insert data");
//       } else {
//         res.send("Data insert Successfully");
//       }
//     });
//   } else {
//     res.send("Fills all required fields");
//   }
// });

// app.patch("/:id", (req, res) => {
//   const id = req.params.id;
//   let coming = Object.entries(req.body);
//   con.query(
//     `update student SET  ${coming[0][0]} = '${coming[0][1]}' WHERE id=${id}`,
//     (err, data) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send("Updata Successfully");
//       }
//     }
//   );
// });

// app.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   con.query(`delete from student where id=${id}`, (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("Data deleted Successfully");
//     }
//   });
// });

app.listen(8000, () => {
  console.log("SERVER AT 8000");
});
