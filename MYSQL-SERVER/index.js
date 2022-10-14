const express = require("express");
const con = require("./config");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  con.query("select * from users", (err, data) => {
    res.send(data);
  });
});

app.post("/", (req, res) => {
  // from static method
  // const data= {name:'shiva'};

  // from postman
  const data = req.body;
  con.query("INSERT INTO users SET ?", data, (err, data, fields) => {
    if (err) {
      console.log("Couldnot insert");
    } else {
      res.send(data);
      //   res.send("DATA INSERT SUCCESSFULLY");
    }
  });
});

app.patch("/:id", (req, res) => {
  // static method
  //   const data = ["test", "testsurname", "test@gmail", "testpassword", 15];
  //   con.query(
  //     "UPDATE users SET first_name=?, last_name=?, email=?, password=? where id=?",
  //     data,
  //     (err, data, fields) => {
  //       if (err) {
  //         console.log("ERROR");
  //       } else {
  //         res.send(data);
  //       }
  //     }
  //   );

  // from postman
  const data = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
    req.params.id,
  ];
  con.query(
    "UPDATE users SET first_name=?, last_name=?, email=?, password=? where id=?",
    data,
    (err, data, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  const data = [req.params.id];
  con.query("DELETE FROM users where id=?", data, (err, data, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(8000, () => {
  console.log("server at 8000");
});

// // PERSONAL PRACTICE WITH MYSQL DATABASE
// const express = require("express");
// const con = require("./config");
// const app = express();
// app.use(express.json());

// // getting all data
// app.get("/", (req, res) => {
//   con.query("SELECT * FROM users", (err, data) => {
//     // res.send(data);
//     if (err) {
//       console.log("error");
//     } else {
//       console.log(data);
//     }
//   });
// });

// // getting specific data through id key
// app.get("/:id", (req, res) => {
//   con.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, data) => {
//     if (err) {
//       res.send("COULDNOT GET THIS ID");
//     } else {
//       res.send(data);
//     }
//   });
// });

// // insert the data with valid fields.
// app.post("/", (req, res) => {
//   let data = req.body;
//   const check =
//     data.first_name && data.last_name && data.email && data.password;
//   if (check) {
//     con.query("INSERT INTO users SET?", data, (err, data) => {
//       if (err) {
//         res.send("couldnot insert");
//       } else {
//         res.send("Successfully insert");
//       }
//     });
//   } else {
//     res.send("Couldnot insert data... do fill all required fields");
//   }
// });

// app.patch("/:id", (req, res) => {
//   let string = JSON.stringify(req.body);
//   con.query(
//     `UPDATE users SET ${string} WHERE id=${req.params.id}`,
//     (err, data) => {
//       if (err) {
//         res.send("Couldnot update the data");
//       } else {
//         res.send("Successfully update the data");
//       }
//     }
//   );
// });

// app.delete("/:id", (req, res) => {
//   con.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, data) => {
//     if (err) {
//       res.send("Couldnot delete this id");
//     } else {
//       res.send("Successfully deleted data");
//     }
//   });
// });

// app.listen(8000, () => {
//   console.log("server at 8000");
// });
