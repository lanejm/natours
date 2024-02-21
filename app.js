const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json()); //middleware

app.use((req, res, next) => {
    next() //always need to use next in middleware
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next()
})

const tours = JSON.parse(
  fs.readFileSync("./starter/dev-data/data/tours-simple.json")
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length, //not necessary but it's good practice to return a count of items in an array
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  //error handling
  // if(id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    "./starter/dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "created",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; //convert string to a number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: `Tour with id ${id} not found.`,
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
//GET all tours
// app.get('/api/v1/tours', getAllTours)

//GET tour by id
// app.get('/api/v1/tours/:id', getTour)

//handle POST request to add new tour
// app.post('/api/v1/tours', createTour)

//PATCH requests - example, doesn't really do anything in this case
// app.patch('/api/v1/tours/:id', updateTour );

//DELETE requests - just and example, doesn't really delete tour
// app.delete('/api/v1/tours/:id', deleteTour );

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
