const con = require("../config");
const Student = require("../model/studentModel");

exports.getAllStudentData = (req, res) => {
  con.query("select * from student", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      // // console.log(JSON.stringify(data));
      // let data1 = JSON.stringify(data);
      // let data2 = JSON.parse(data1);
      // res.render("records", { users: data2 });
      res.send(data);
    }
  });
};

// exports.getForm = (req, res) => {
//   res.render("create");
// };

// exports.updateForm = (req, res) => {
//   res.render("update");
// };

// exports.deleteForm = (req, res) => {
//   res.render("delete");
// };

exports.getSpecificDataById = (req, res) => {
  const id = req.params.id;
  con.query(`select * from student WHERE id= ${id}`, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

exports.createNewStudent = (req, res) => {
  const check =
    req.body.id && req.body.name && req.body.email && req.body.address;
  if (check) {
    con.query("INSERT INTO student SET?", req.body, (err, data) => {
      if (err) {
        res.send("Couldnot insert data");
      } else {
        res.send("Data insert Successfully");
      }
    });
  } else {
    res.send("Insert blank spaces");
  }
};

// //Router to UPDATE a learner's detail
// app.put('/learners', (req, res) => {
//   let learner = req.body;
//   var sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?;
//   CALL learnerAddOrEdit(@learner_id,@learner_name,@learner_email,@course_Id);";
//   mysqlConnection.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
//   if (!err)
//   res.send('Learner Details Updated Successfully');
//   else
//   console.log(err);
//   })
//   });

exports.updateStudentDataById = (req, res) => {
  let data = [req.body.name, req.body.email, req.body.address];
  con.query(
    `UPDATE student SET name=?, email=?, address=?, WHERE id= ${req.params.id}`,
    data,
    (err) => {
      if (err) {
        res.send(err);
        // console.log("fuck");
      } else {
        res.send("UPDATE SUCCESSFULLY");
        // console.log("Fuck");
      }
    }
  );
};

exports.deleteStudentDataById = (req, res) => {
  console.log(req.query);
  const id = req.params.id;
  con.query(`delete from student where id=${id}`, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Data deleted Successfully");
    }
  });
};
