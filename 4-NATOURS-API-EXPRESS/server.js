const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Catching Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! ... ShutTing down");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// //this is from stackOverflow code
// mongoose
//   .connect("mongodb://localhost/testdb")
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
//   });

// above code is from stack overflow it just worked...

//---------------------------- this code is written from JONAS
// mongoose.connect(process.env.DATABASE_LOCAL, {
//for local storage...
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("DB CONNECTION SUCCESSFULLY!"));
//---------------------------------------------------------------------------

//   .then((con) => {
//     console.log(con.connections);
//     console.log("DB CONNECTION SUCCESSFULLY");
//   });

// ----------> create a SCHEMA... ---> (tour schema)
///this is for testing...
// const testTour = new Tour({
//   name: "The Snow Hiker",
//   rating: 4.7,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(`ERROR: ${err}`);
//   });
//testing ended...

// console.log(app.get('env'));
// console.log(process.env);

// 4----> START SERVER....
// const port= process.env.PORT || 3000;
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// ERRORS OUTSIDE EXPRESS UNHANDLED REJECTIONS
// event and event handler
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! ... ShutTing down");
  server.close(() => {
    process.exit(1);
  });
});

// // THIS IS DEFINE IN ON TOP BECAUSE ITS DOESNOT WORK OTHERWISE....
// // CATCHING UNCAUGHT EXCEPTIONS
// // EXAMPLE: console.log(x); // which doestnot define...
// process.on("uncaughtException", (err) => {
//   console.log(err.name, err.message);
//   console.log("UNCAUGHT EXCEPTION! ... ShutTing down");
//   server.close(() => {
//     process.exit(1);
//   });
// });

// console.log(x); // for testing purpose... this is works on anywhere ... like app.js and any other ... but this is not works inside the middleware functions...
