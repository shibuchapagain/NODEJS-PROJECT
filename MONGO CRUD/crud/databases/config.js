const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "mern10";
const collectionName = "persons";
const client = new MongoClient(url);

// // // to get data from database
// async function getData() {
//   let result = await client.connect();
//   db = result.db(dbName);
//   collection = db.collection(collectionName);
//   let data = await collection.find({}).toArray();
//   console.log(data);
// }
// getData();

// TO CONNECT DATABASE
async function dbConnect() {
  let result = await client.connect();
  db = result.db(dbName);
  return db.collection(collectionName);
}
module.exports = dbConnect;
