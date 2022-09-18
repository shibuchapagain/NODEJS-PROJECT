const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
  const token = req.headers["x-access-token"];

  // check token provided or not
  if (!token)
    return res
      .status(403)
      .json({ status: "Fail", message: "No token provided" });
  // check token is valid or not:
  jwt.verify(token, "shibuchapagain12", (err, decoded) => {
    // decoded -> gives user info to used for create a jwt token.
    if (err)
      return res
        .status(500)
        .json({ status: "Fail", message: "Fail to authenticate token" });
    // if everything well
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  });
};

module.exports = { token };
