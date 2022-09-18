const express = require("express");
const router = express.Router();
const con = require("../config");
const studentController = require("../controllers/studentController");

router
  .route("/")
  .get(studentController.getAllStudentData)
  .post(studentController.createNewStudent);

// router.get("/record", studentController.getAllStudentData);
// // router.get("/create", studentController.createNewStudent);
// router.get("/create", studentController.getForm);
// router.get("/update", studentController.updateForm);
// router.get("/delete", studentController.deleteForm);

// router.post("/create", studentController.createNewStudent);

router
  .route("/:id") // /:id
  .get(studentController.getSpecificDataById)
  .patch(studentController.updateStudentDataById)
  .delete(studentController.deleteStudentDataById);

// router.patch("/", studentController.updateStudentDataById);
// router.delete("/", studentController.deleteStudentDataById);

// check

// router.post("/update", (req, res) => {
//   let id = req.body.id;
//   // res.send(id);
//   let coming = Object.entries(req.body);
//   //   console.log(`${coming[1][0]} = '${coming[1][1]}'`); // name
//   //   console.log(`${coming[2][0]} = '${coming[2][1]}'`); // email
//   //   console.log(`${coming[3][0]} = '${coming[3][1]}'`); // address
//   con.query(
//     `update student SET  ${coming[2][0]} = '${coming[2][1]}' WHERE id=${id}`,
//     (err, data) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send("Updata Successfully");
//       }
//     }
//   );
// });

// router.post("/dlt", (req, res) => {
//   let id = req.body.id;
//   con.query(`delete from student where id=${id}`, (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("Data deleted Successfully");
//     }
//   });
// });

module.exports = router;
