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
    unique: true
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


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});