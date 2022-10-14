// var mongoClient = require("mongodb").MongoClient;
import mongodb from "mongodb";
let mongoClient = mongodb.MongoClient;

var databaseName = "mern10";
const collectionName = "persons";
var url = `mongodb://localhost:27017/${databaseName}`;

// insert record
var insertRecord = (objPerson) => {
  //connect with db
  let res = false;
  //insert on respective collection
  //return insert result (true/false)
  mongoClient.connect(url, function (err, db) {
    if (err) {
      res = false;
    }
    var dbo = db.db(`${databaseName}`); // use database
    // var myobj = { name: "Raj Rai", address: "Ktm" };
    // var myobj = { name: "Kiran Thapa", address: "Lat" };
    //var myobj = { name: "Rojina ", address: "Bhk" };
    dbo
      .collection(`${collectionName}`)
      .insertOne(objPerson, function (err, res) {
        // if (err) throw err;
        if (err) {
          return false;
        } else {
          console.log("Document insert successfully");
          objPerson.result = true;
          db.close();
          res = true;
        }
      });
  });
  // return insert result (true/false)
  console.log(`result: ${res}`);
  objPerson.result = res;
  return res;
};

let getAll = () => {
  mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(`${databaseName}`);
    dbo
      .collection(`${collectionName}`)
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  });
};
// console.log(getAll);

export { insertRecord, getAll };
