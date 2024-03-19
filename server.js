const mongoose = require('mongoose')
const dontenv = require('dotenv')
const app = require("./app")

dontenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose
//.connect(process.env.DATABASE_LOCAL) connect to local DB
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connection successful')
})

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true //impossible to have two tours with same name
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  }
})

const Tour = mongoose.model( 'Tour', tourSchema )

const testTour = new Tour({
  name: "The Park Camper",
  rating: 4.7,
  price: 997
})

//saves document to the DB
testTour.save().then(doc => {
console.log(doc)
}).catch(err => {
  console.log("ERROR, ERROR, ERROR", err)
}) 

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});