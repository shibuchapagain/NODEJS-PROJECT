const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ownProjectDB");

// for schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
});

// for model
// const User= mongoose.model("datas", userSchema);

// for insert the data in database through mongoose
const insertInDB = async () => {
  const User = mongoose.model("datas", userSchema);
  let data = new User({
    name: "jonas schmedtman",
    age: 37,
    email: "jonas@gmail.com",
    address: "Portugal",
  });
  let result = await data.save();
  console.log(result);
};
// insertInDB();

const deleteInDB = async () => {
  const User = mongoose.model("datas", userSchema);
  let data = await User.deleteOne({ name: "jonas schmedtman" });
  console.log(data);
};
// deleteInDB();

const updateInDB = async () => {
  const User = mongoose.model("datas", userSchema);
  let data = await User.updateOne(
    { name: "jonas schmedtman" },
    { $set: { age: 45 } }
  );
  console.log(data);
};
// updateInDB();

const findInDB = async () => {
  const User = mongoose.model("datas", userSchema);
  // let data = await User.find({ name: "jonas schmedtman" }); // for specific
  let data = await User.find({});
  console.log(data);
};
// findInDB();
