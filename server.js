const mongoose = require('mongoose')
const dontenv = require('dotenv')
const app = require("./app")

dontenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log(con.connections)
  console.log('DB connection successful')
})
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});