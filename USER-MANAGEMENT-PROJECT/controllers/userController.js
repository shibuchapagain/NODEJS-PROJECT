const User = require("./../models/userModel");

const getAllUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      status: "Success",
      length: users.length,
      message: "Here is your users",
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Here is your data",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: `COULNOT FIND ${err}`,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Create a new user Successfully",
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: `Fail to create a new User: ${err}`,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "Success",
        message: "COULD NOT UPDATE THE DATA",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Update data Successfully",
      });
    }
  });
};

const deleteSpecificUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: `Could not delete this id ${err}`,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  getSpecificUser,
  deleteSpecificUser,
};
