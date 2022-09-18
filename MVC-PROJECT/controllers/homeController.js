const homeController = (request, response) => {
  response.render("home");
};

const aboutController = (req, res) => {
  res.render("about");
};

export { homeController, aboutController };
