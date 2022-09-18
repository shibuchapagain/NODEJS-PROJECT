const rootRole = (req, res, next) => {
  const userRole = req.userRole;

  if (userRole == "root") {
    next();
  } else {
    res.status(400).json({
      status: "Fail",
      message: "You can not access this route",
    });
  }
};

const adminRole = (req, res, next) => {
  const userRole = req.userRole;

  if (userRole == "admin") {
    next();
  } else {
    res.status(400).json({
      status: "Fail",
      message: "You can not access this route",
    });
  }
};

const superRole = (req, res, next) => {
  const userRole = req.userRole;

  if (userRole == "super") {
    next();
  } else {
    res.status(400).json({
      status: "Fail",
      message: "You can not access this route",
    });
  }
};

const userRole = (req, res, next) => {
  const userRole = req.userRole;

  if (userRole == "user") {
    next();
  } else {
    res.status(400).json({
      status: "Fail",
      message: "You can not access this route",
    });
  }
};

module.exports = { rootRole, adminRole, superRole, userRole };
