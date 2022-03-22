import mongoose from 'mongoose'
import dotenv from 'dotenv'

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
// NOTE:: import app.js after importing dotenv!!!
import App from './App.js'

// Fetching DB link from .env file
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)

// Connecting to db
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('Yuhoo... DB successfully connected!'.cyan)
  })
  .catch((err) => console.log(`${err}`.red.underline))
  

// setting port for server
const PORT = process.env.PORT || 8000

// Creating/starting server on port
const server = App.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port : ${PORT}`.yellow
      .bold.underline
  )
})
