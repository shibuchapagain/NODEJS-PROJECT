
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

// mongoose
//   .connect("mongodb://localhost/practice")
//   .then(() => {
//     console.log("finally connect to database");
//   })
//   .catch((err) => {
//     console.log("Unable to connect database :" + err);
//   });

//for middleware
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("A request was made to:");
//   next();
// });

//client want to some data from database... USE GET... METHOD
app.get("/", (req, res) => {
  //   res.send("hii ima ok"); //for testing purpose
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "cant read",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Here is your data",
      data: {
        data: JSON.parse(data), //for convert json format
      },
    });
  });
  /////////////////////////////
});

// client want to save data to the DATABASE .... USE POST METHOD ...
app.post("/", (req, res) => {
  //   console.log(req.body);
  //////////////////////////
  //for vallidate (user fill the all data or not ...)
  const { name, email, code, address } = req.body;

  // for checking ...
  if (!name || !email || !code || !address) {
    res.status(400).json({
      status: "fail",
      message: "Please provide all the details / provide details",
    });
    return;
  }

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Internal server ERROR",
      });
      return;
    }
    const data_ = JSON.parse(data);
    const newData = {
      //   name: req.body.name,
      //   email: req.body.email,
      //   code: req.body.code,
      //   address: req.body.address,
      //// ---> in below after destructuring ....
      name: name,
      email: email,
      code: code,
      address: address,
    };

    //validate or check cant add dublicate(same value) and other other
    const unique = data_.find((item) => item.name === req.body.name);
    if (unique) {
      res.status(400).json({
        status: "fail",
        message: "Name is already exit",
      });
      return; //terminate
    }

    data_.push(newData);
    // console.log(data_);

    fs.writeFile("./database.json", JSON.stringify(data_), "utf8", () => {
      res.status(200).json({
        message: "DATA ADDED SUCCESSFULL",
      });
    });
  });
});

///////
//for delete .... by there name / code ...
app.delete("/", (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: "Please provide a valid name for delete",
    });
    return;
  }

  fs.readFile("./database.json", "utf8", (err, data) => {
    const data_ = JSON.parse(data);
    const index = data_.findIndex((item) => item.name === name);
    if (index == -1) {
      res.status(400).json({
        status: "fail",
        message: "Name doesn't exist",
      });
      return;
    }

    data_.splice(index, 1);

    fs.writeFile("./database.json", JSON.stringify(data_), "utf8", () => {
      res.status(200).json({
        status: "Success",
        message: "Data delete successfully",
      });
    });
  });
});

// app.patch("/", (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Invalid ID",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: "< UPDATED TOURS...>",
//     },
//   });
// });

/////////////////////////////////////////////////

app.listen(8000, () => {
  console.log("OUR SERVER IS STARTED AT 8000 PORT...");
});

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////// --------------> OWN PRACTICE ------------------------------------------------>
