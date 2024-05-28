// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync('./starter/dev-data/data/tours-simple.json')
// ); no longer needed used for testing purposes

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is : ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: `Invalid ID`,
//     });
//   }
//   next();
// };

//check body of post request to see if required information (name, price) is in payload

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };
exports.getAllTours = async (req, res) => {
  try {
    //Build query
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFIelds = ['page', 'sort', 'limit', 'fields'];
    excludedFIelds.forEach((el) => delete queryObj[el]); //delete all the fields that are not needed

    // 1B) advanced  filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //replace gte, gt, lte, lt with $gte, $gt, $lte, $lt

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      //if sort is in query
      const sortBy = req.query.sort.split(',').join(' '); //split the string into an array and join it with a space
      query = query.sort(sortBy);
      // sort('price' ratingsAverage)
    } else {
      query = query.sort('-createdAt');
    }

    //3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields); //select only the fields that are needed
    } else {
      query = query.select('-__v'); //select all fields except __v
    }

    //4) Pagination
    const page = req.query.page * 1 || 1; //if page is not in query it will default to page 1
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit)

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    //execute query
    const tours = await query;
    //send response
    res.status(200).json({
      status: 'success',
      results: tours.length, //not necessary but it's good practice to return a count of items in an array
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findONe({ _id: req.params.id}) same logic as line above

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'created',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'updated',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
