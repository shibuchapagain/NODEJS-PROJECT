const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const loginUser = async (req, res) => {
  const { email } = req.body;
  // to find user.
  const userEmail = await User.findOne({ email });
  const { id, role } = userEmail;
  // check user exists or not.
  if (!userEmail)
    return res
      .status(404)
      .json({ status: "Fail", message: "Invalid email & password" });
  // check password...
  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    userEmail.password
  );
  if (!passwordIsValid)
    return res.status(401).json({ auth: false, token: null });

  // create a token
  const token = jwt.sign({ id, role }, "shibuchapagain12", {
    expiresIn: 86400,
  });
  res.status(200).json({
    status: "Success",
    token,
  });
};

module.exports = { loginUser };
