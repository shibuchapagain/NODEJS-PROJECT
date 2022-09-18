const indexController = (req, res) => {
  res.render("index");
};

const homeController = (request, response) => {
  response.render("home");
};

const aboutController = (req, res) => {
  res.render("about");
};

const contactController = (req, res) => {
  res.render("contact");
};

const factsController = (req, res) => {
  res.render("facts");
};

const footerController = (req, res) => {
  res.render("footer");
};

const portfolioController = (req, res) => {
  res.render("portfolio");
};

const reumeController = (req, res) => {
  res.render("resume");
};

const servicesController = (req, res) => {
  res.render("services");
};

const skillController = (req, res) => {
  res.render("skill");
};

const testimonialsController = (req, res) => {
  res.render("testimonials");
};

const formController = (req, res) => {
  res.send("Thank you for joining us.");
};

export {
  indexController,
  homeController,
  aboutController,
  contactController,
  factsController,
  footerController,
  portfolioController,
  reumeController,
  servicesController,
  skillController,
  testimonialsController,
  formController,
};
