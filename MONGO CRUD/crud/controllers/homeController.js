// const { insertData } = require("../databases/mongo_client");

let { insertData } = require("../config");

var homeController = (request, response) => {
  response.render("home");
};

var formController = (request, response) => {
  response.render("addnew");
};

const saveController = (req, res) => {
  let { txtName, txtAddress } = req.query;
  let obj = {
    name: txtName,
    address: txtAddress,
  };
  if (insertData(obj)) {
    res.send("LUCK");
  } else {
    res.send("FUCK");
  }
};

// var saveController = (request, response) => {
//   //receive values
//   var { txtName, txtAddress } = request.query;
//   console.log(txtName, txtAddress);

//   //send to mongo_client-> saveRecord()
//   //   insertData(request.query);
//   //   console.log(insertData(request.query));
//   if (insertData(request.query).then((res) => res)) {
//     response.send("INSERT SUCCESS");
//   } else {
//     response.send("INSERT FAIL");
//   }
//   //receive result and redirect to view
//   //   response.send("Save record successfully!");
// };

// export { homeController, formController, saveController };
module.exports = { homeController, formController, saveController };
