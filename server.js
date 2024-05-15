const mongoose = require('mongoose')
const dontenv = require('dotenv')

dontenv.config({ path: './config.env' })
const app = require("./app")



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

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});