import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import xss from 'xss-clean'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'

// relative imports
import { AppError, globalErrorHandler } from './middlewares/Errorhandler.js'
import parkadeRoutes from './routes/parkadeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const App = express()

App.use(express.json())

// logger for dev mode
if (process.env.NODE_ENV === 'development') {
  App.use(morgan('dev'))
}

App.use(cors({ credentials: true }))
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Try again in an hour!',
})
App.use('/api', limiter)
App.use(express.json()) // can use custom middleware
App.use(cookieParser())

// Data sanitization against NOSQL query injection
App.use(ExpressMongoSanitize())
// Data sanitization against XSS
App.use(xss())

// Routes: mini Application for each functions
App.use('/api/v1/parkades', parkadeRoutes)
App.use('/api/v1/users', userRoutes)
App.use('/api/v1/reviews', reviewRoutes)
App.use('/api/v1/bookings', bookingRoutes)

// Unknown routes (Wait a min. who are you?)
App.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// koi v error ane k baad tumhe mujhse guzarna pdega!!
App.use(globalErrorHandler)

export default App
