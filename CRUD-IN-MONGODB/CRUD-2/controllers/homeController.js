import { insertRecord, getAll } from "../databases/mongo_client.js";

var homeController = (request, response) => {
  let objPersons = getAll();
  response.render("home", { persons: objPersons }); // Display all persons in home.ejs
};

var formController = (request, response) => {
  response.render("addnew");
};

var saveController = (request, response) => {
  //receive values
  var { txtName, txtAddress } = request.query;
  console.log(txtName, txtAddress);
  //   let res = insertRecord({ name: txtName, address: txtAddress });
  //send to mongo_client-> saveRecord()
  let obj1 = { name: txtName, address: txtAddress };
  let res = insertRecord(obj1);
  //receive res and redirect to view
  //   console.log(res);
  if (res) {
    response.send("Save record successfully");
  } else {
    response.send("Error to save record");
  }
};

export { homeController, formController, saveController };
