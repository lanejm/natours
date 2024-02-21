const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync('./starter/dev-data/data/tours-simple.json')
);
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length, //not necessary but it's good practice to return a count of items in an array
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  //error handling
  // if(id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    './starter/dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'created',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
