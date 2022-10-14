const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const databaseName = "mern10";
const collectionName = "persons";
const url = `mongodb://localhost:27017/${databaseName}`;
const client = new mongoClient(url);

// // get data from db
// const getData = () => {
//   mongoClient.connect(url, (err, db) => {
//     if (err) console.log("error");
//     let dbo = db.db(databaseName);
//     dbo
//       .collection(collectionName)
//       .find({})
//       .toArray((err, res) => {
//         if (err) console.log("error");
//         console.log(res);
//         db.close();
//       });
//   });
// };
// // getData();

// connect to database ...
const dbConnect = async () => {
  let result = await client.connect();
  db = result.db(databaseName);
  return db.collection(collectionName);
};

// insert
const insertData = async (obj) => {
  let result = await dbConnect();
  console.log(obj);
  let valid = (obj.name = "") && (obj.address = "");
  //   console.log(!valid);
  if (!valid) {
    let data = await result.insertOne(obj);
    return data.acknowledged;
  } else {
    return "invalid";
  }
};

let obj = {
  name: "testing",
  address: "",
};
let check = insertData(obj).then((res) => console.log(res));
console.log(check);

if (check) {
  console.log("luck");
} else {
  console.log("fuck");
}

// //insert
// const insertData = async (obj) => {
//   let result = await dbConnect();
//   await result.insertOne(obj, (err, res) => {
//     if (err) console.log("error");
//     if (res.acknowledged == "true") {
//       console.log("DATA INSERT SUCCESS");
//     } else {
//       console.log("FUCK");
//     }
//   });
// };
