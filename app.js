const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./starter/routes/tourRoutes");
const userRouter = require("./starter/routes/userRoutes");
const app = express();

//1) MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./starter/public"));

app.use((req, res, next) => {
  next(); //always need to use next in middleware
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//4) START THE SERVER

module.exports = app;
