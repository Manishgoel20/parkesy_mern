import moment from 'moment'
import { asyncHandler } from '../middlewares/Errorhandler.js'

export const getAllBookings = asyncHandler(async (req, res, next) => {})

export const getBooking = asyncHandler(async (req, res, next) => {})

export const createBooking = asyncHandler(async (req, res, next) => {})

// export const getAvailStats = asyncHandler(async (req, res, next) => {
//   const { sdt, edt, type } = req.params

//   let ndt = moment().sdt
//   console.log(sdt, edt, type)
//   console.log(moment(ndt, 'DD-MM-YYYY'))

//   res.json({
//     status: 'success',
//     ndt,
//   })
// })
