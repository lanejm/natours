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
    const tours = await Tour.find();

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
        tours: tour
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
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'created',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }

  exports.updateTour = (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  };

  exports.deleteTour = (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
};
