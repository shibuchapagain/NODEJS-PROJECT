const allRecord = (req, res) => {
  res.render("records");
};

var homeController = (request, response) => {
  response.render("home");
};

const formController = (req, res) => {
  res.render("addnew");
};

const saveController = (req, response) => {
  let getObj = req.query;
  // insertData(getObj);
  if (insertData(getObj)) {
    response.send("DATA INSERT SUCCESSFULLY");
  }
};

export { allRecord, homeController, formController, saveController };
