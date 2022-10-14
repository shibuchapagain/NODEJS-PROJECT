const dbConnect = require("./config");

// insert data into database.
let insertData = async (obj) => {
  let result = await dbConnect();
  let data = await result.insertOne(obj);
  return data.acknowledged;
  //   console.log(data);
};
// let obj = { name: "saaaaa" };
// insertData(obj);

module.exports = { insertData };
