const express = require("express");
const fs = require("fs");
const { userInfo } = require("os");
const APIFeatures = require("./../utils/apiFeatures");

// from utils/ catchAsync ->
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name, price, ratingsAverage, summary, difficulty";
  next();
};
const Tour = require("./../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// ); //this is used for testing purposes

//testing for middleware
// exports.checkID = (req, res, next, val) => {
//   // console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Invallid ID",
//     });
//   }
//   next();
// }; //this is for middleware.... but now... this is fix by mongodb.....

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "FAIL",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

/////////

// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filter() {
//     // 1A) FILTERING
//     const queryObj = { ...this.queryString };
//     const excludedFields = ["page", "sort", "limit", "field"];
//     excludedFields.forEach((el) => delete queryObj[el]);
//     // console.log(req.query, queryObj);

//     // 1B) ADVANCED FILTERING
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     // console.log(JSON.parse(queryStr));
//     // { duration: { $gte: '5' }, difficulty: 'easy' }
//     // { duration: { gte: '5' }, difficulty: 'easy' }
//     // gte, gt .. lte, lt
//     this.query.find(JSON.parse(queryStr));
//     return this;
//     // let query = Tour.find(JSON.parse(queryStr));
//   }

//   sort() {
//     // 2) SORTING
//     // price can sort in plus/minus ex- ?sort=price && ?sort=-price
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       // console.log(sortBy);
//       this.query = this.query.sort(sortBy);
//       // sort('price ratingsAverage')
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }

//   limitFields() {
//     // 3) FIELD LIMITING
//     if (this.queryString.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select("-__v");
//     }

//     return this;
//   }

//   paginate() {
//     // 4) PAGINATION
//     const page = this.queryString.page * 1 || 1; // nice way to defining default value(string to number by multyiply 1)
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     // page=3&limit=10 // 1,10 (page1) && 11,20 (page2) && 21,30 (page3)
//     this.query = this.query.skip(skip).limit(limit);

//     // do not need that
//     //  if (this.queryString.page) {
//     //    const numTours = await Tour.countDocuments();
//     //    if (skip >= numTours) throw new Error("This page doesnot exists");
//     //  }

//     return this;
//   }
// }

///////
// 2----> ROUTE HANDLERS...

exports.getAllTours = catchAsync(async (req, res, next) => {
  // console.log(req.requestTime);
  // res.status(200).json({
  //   status: "success",
  //   requestedAt: req.requestTime,
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
  //------------>
  // console.log(req.query);
  // try {
  // console.log(req.query);
  // BUILD QUERY
  // // 1A) FILTERING
  // const queryObj = { ...req.query };
  // const excludedFields = ["page", "sort", "limit", "field"];
  // excludedFields.forEach((el) => delete queryObj[el]);
  // // console.log(req.query, queryObj);

  // // 1B) ADVANCED FILTERING
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // // console.log(JSON.parse(queryStr));
  // // { duration: { $gte: '5' }, difficulty: 'easy' }
  // // { duration: { gte: '5' }, difficulty: 'easy' }
  // // gte, gt .. lte, lt
  // THATS THE ANOTHER IDEA TO SEARCH / FILTERING ...

  // let query = Tour.find(JSON.parse(queryStr));
  // // 2) SORTING
  // // price can sort in plus/minus ex- ?sort=price && ?sort=-price
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   // console.log(sortBy);
  //   query = query.sort(sortBy);
  //   // sort('price ratingsAverage')
  // } else {
  //   query = query.sort("-createdAt");
  // }

  // // 3) FIELD LIMITING
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   query = query.select(fields);
  // } else {
  //   query = query.select("-__v");
  // }

  // // 4) PAGINATION
  // const page = req.query.page * 1 || 1; // nice way to defining default value(string to number by multyiply 1)
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // // page=3&limit=10 // 1,10 (page1) && 11,20 (page2) && 21,30 (page3)
  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments();
  //   if (skip >= numTours) throw new Error("This page doesnot exists");
  // }

  /////////////////////////////////////////////////////////////////////////////
  // EXECUTE THE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  // const tours = await query;

  // const tours = await Tour.find()
  //   .where("duration")
  //   .equals(5) // lt(5) // less than (5)...
  //   .where("difficulty")
  //   .equals("easy");
  // SEND RESPONSE

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});

exports.getTour = catchAsync(async (req, res, next) => {
  // // console.log(req.params);
  // const id = req.params.id * 1; //change STRING to NUMBER...
  // const tour = tours.find((el) => el.id === id);
  // // // if(id>tours.length){
  // //     if(!tour){
  // //     return res.status(404).json({
  // //         status:'fail',
  // //         message:'Invalid ID',
  // //     });
  // // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     // tours:tour, //same as
  //     tour,
  //   },
  // });
  //----------------------------->
  // try {
  const tour = await Tour.findById(req.params.id); // in this id is come from routers(':id')... so we did that(req.params.id);
  //Tour.findOne({ _id:req,params.id })

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});

// this code written in utils/catchAsync
// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     // fn(req, res, next).catch((err) => next(err));
//     fn(req, res, next).catch(next);
//   };
// };

exports.createTour = catchAsync(async (req, res, next) => {
  //----> using create documents ....
  // const newTour = new Tour({});
  // newTour.save();
  //we can do same as above ....
  // try {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
  // } catch (err) {
  //   res.status(400).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});

exports.updateTour = catchAsync(async (req, res, next) => {
  // // if(req.params.id *1 > tours.length){
  // //     return res.status(404).json({
  // //         status:'Fail',
  // //         message:'Invalid ID'
  // //     })
  // // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: "< UPDATED TOURS...>",
  //   },
  // });

  // ------------------------------->
  // try {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  // // if(req.params.id *1 > tours.length){
  // //     return res.status(404).json({
  // //         status:'Fail',
  // //         message:'Invallid ID'
  // //     })
  // // }
  // res.status(204).json({
  //   status: "success",
  //   data: null,
  // });

  // ----------------------------------->
  // try {
  const tour = await Tour.findByIdAndDelete(req.params.id); //we dont send back to client so dont asssign in any variable ....

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // try {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        // _id: "$ratingsAverage", // seperate based on ratings
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: "EASY" } }, // ne means not eqaul... except easy -->
    // },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
});
// match is used for select documents
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // try {
  const year = req.params.year * 1; // 2021 // trick to convert string to number
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0, // no longer show
      },
    },
    {
      $sort: { numTourStarts: -1 }, // - for decending and + for accending
    },
    // {
    //   $limit: 6, // show up only 6 documents
    // },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "Fail",
  //     message: err,
  //   });
  // }
});
