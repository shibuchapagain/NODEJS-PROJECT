////////////////////////////////////////////////////////////////////////////////////////
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
// const dbName = "ownProjectDB";
const dbName = "crud";
const client = new MongoClient(url);

// // to get data from database
// async function getData() {
//   let result = await client.connect();
//   db = result.db(dbName);
//   collection = db.collection("data");
//   let data = await collection.find({}).toArray();
//   console.log(data);
// }
// getData();

// TO CONNECT DATABASE
async function dbConnect() {
  let result = await client.connect();
  db = result.db(dbName);
  // return db.collection("data");
  return db.collection("student");
}
module.exports = dbConnect;
