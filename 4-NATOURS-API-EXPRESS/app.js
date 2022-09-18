const { application } = require("express");
const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const fs = require("fs");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1---> MIDDLEWARES...

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// //create own middleware....
// app.use((req, res, next) => {
//   // console.log(`HELLO FROM THE MIDDLEWARE.`);
//   next();
// });

app.use((req, rea, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//for getting the data from server... CRUD OPERATION
// app.get('/api/v1/tours',getAllTours); //------------>GET
//FOR GETTING FROM SERVER... SPECIFIC ID..
// app.get('/api/v1/tours/:id', getTour);

//FOR UPLOAD THE DATA INTO SERVER.... FROM CLIENT
// app.post('/api/v1/tours', createTour); //----------------->POST
//Patch for-->update the data...
// app.patch('/api/v1/tours/:id', updateTour);

//FOR DELETE THE DATA ...
// app.delete('/api/v1/tours/:id', deleteTour);

//route '/api/vi/tours.../:id' are path...

// 3---> ROUTES...

// app.use('/api/v1/tours', tourRouter); //MIDDLEWARE
// app.use('/api/v1/users', userRouter);

// catching uncaught exception
// console.log(x); // works

//3 ROUTES

app.use("/api/v1/tours", tourRouter); // MIDDLEWARE
app.use("/api/v1/users", userRouter);

// handling unhandled routes
app.all("*", (req, res, next) => {
  // // res.status(404).json({
  // //   status: "fail",
  // //   message: `Can't find ${req.originalUrl} on this server!`,
  // // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;

  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Implementing the global error handling middleware
// express automatically knows this is the ERROR HANDLING MIDDLEWARE ...

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// }); // this is placed on errorController.js

app.use(globalErrorHandler);

// 4----> START SERVER....
module.exports = app;
