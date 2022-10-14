const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dbName = "mern10";
const collectionName = "persons";
const url = `mongodb://localhost:27017/${dbName}`;
// const url = `mongodb://localhost:27017/`;
let client = new mongoClient(url);

// list of database in present on local device
const dbList = async (client) => {
  databaseList = await client.db().admin().listDatabases();
  databaseList.databases.forEach((db) => console.log(db.name));
};
// dbList(client);

// connect to database
const connectDB = () => {
  mongoClient.connect(url, (err, db) => {
    if (err) console.log("error");
    console.log(db);
  });
};
connectDB();
