const express = require('express');
const tourController = require('./../controllers/tourContoller');

const router = express.Router();

// can be used to define param middleware
// router.param('id', tourController.checkID);

router.route("/top-5-cheap").get(tourController.getAllTours)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
