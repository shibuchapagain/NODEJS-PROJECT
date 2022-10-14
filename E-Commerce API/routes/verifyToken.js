const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  const token = authHeaders.split(" ")[1];
  if (authHeaders) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(402).json("Invald token");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user); // about user information
    // console.log(`user id :${req.user.id}... and params id is ${req.params.id}`);
    if (req.user.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
