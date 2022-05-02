import mongoose from 'mongoose'
import ApiFeatures from '../middlewares/ApiFeatures.js'
import { AppError, asyncHandler } from '../middlewares/Errorhandler.js'
import { Booking } from '../models/bookingModel.js'
import { Parkade } from '../models/parkadeModel.js'

function greeting(st) {
  const hour = st.hour()
  if (hour > 16) return 2
  if (hour > 11) return 1
  return 0
}

/////////////////////////// PARKADE NEARBY
export const getParkadesNearbyAvailable = asyncHandler(
  async (req, res, next) => {
    const { lng, lat, vehicle, st, et, dist } = req.params

    if (!lng || !lat || !vehicle || !st || !et || !dist) {
      return new AppError('Please provide all informations', 400)
    }

    const parkades = await Parkade.aggregate([
      {
        // Remember: $geoNear needs atleast 1 geo spatial index registered if more than 1 mention "keys" parameter
        $geoNear: {
          near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
          distanceField: 'distance',
          maxDistance: dist * 1000,
          distanceMultiplier: 0.001,
        },
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'parkade',
          as: 'alreadyBooked',
          pipeline: [
            { $match: { vehicleType: vehicle } },
            {
              $match: {
                $and: [
                  {
                    endDateTime: { $gte: new Date(st) },
                  }, //st
                  {
                    startDateTime: {
                      $lte: new Date(et),
                    },
                  }, //et
                ],
              },
            },
            { $group: { _id: '$parkade', totalBooking: { $count: {} } } },
          ],
        },
      },
      { $sort: { distance: 1 } },
    ])
    // cant do populate use lookup instead

    res.json({
      status: 'success',
      results: parkades.length,
      data: { parkades },
    })
  }
)

/////////////////////////// PARKADE WITHIN
// export const getParkadesNearMeWithDetails = asyncHandler(
//   async (req, res, next) => {
//     const { lng, lat, vehicle, st, et, dist } = req.params
//     const radius = dist / 6378.1 //(in km)

//     if (!lng || !lat || !vehicle || !st || !et || !dist) {
//       return new AppError('Please provide all informations', 400)
//     }

//     const parkades = await Parkade.find({
//       location: {
//         $geoWithin: { $centerSphere: [[lng, lat], radius] },
//       },
//     }).populate('bookings')

//     res.json({
//       status: 'success',
//       results: parkades.length,
//       data: { parkades },
//     })
//   }
// )

/////////////////////////// GET ALL PARKADE
export const getAllParkades = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Parkade.find({ approved: true }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const parkades = await features.query

  res.json({ status: 'success', results: parkades.length, data: { parkades } })
})

/////////////////////////// GET ALL REQUESTED PARKADE
export const getRequestedParkades = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Parkade.find({ approved: false }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const parkades = await features.query

  res.json({ status: 'success', results: parkades.length, data: { parkades } })
})

/////////////////////////// GET SINGLE PARKADE
export const getParkade = asyncHandler(async (req, res, next) => {
  const parkade = await Parkade.findById(req.params.id)
    .populate('provider', 'firstName lastName email role')
    .populate('reviews')
    .populate('bookings')

  if (!parkade) {
    return next(
      new AppError(`Can not found any Parkade with ID : ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ status: 'success', data: { parkade } })
})

/////////////////////////// GET My PARKADE
export const getMyParkades = asyncHandler(async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user.id)

  const parkades = await Parkade.aggregate([{ $match: { provider: userId } }])

  if (!parkades) {
    return next(new AppError(`Can not found any Parkade with this User`, 404))
  }

  res
    .status(200)
    .json({ status: 'success', results: parkades.length, data: { parkades } })
})

/////////////////////////// CREATE PARKADE
export const createParkade = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin') req.body.approved = true
  else req.body.approved = false

  if (!req.body.provider) req.body.provider = req.user.id

  const newParkade = await Parkade.create(req.body)

  if (!newParkade) {
    return next(new AppError(`Bad request send on Id: ${req.params.id}`, 401))
  }

  res.status(201).json({
    status: 'success',
    data: { parkade: newParkade },
  })
})

/////////////////////////// UPDATE PARKADE
export const updateParkade = asyncHandler(async (req, res, next) => {
  const updatedParkade = await Parkade.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!updatedParkade) {
    return next(
      new AppError(`Can not found any Parkade with ID : ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ status: 'success', data: { parkade: updatedParkade } })
})

/////////////////////////// DELETE PARKADE
export const deleteParkade = asyncHandler(async (req, res, next) => {
  const deletedParkade = await Parkade.findByIdAndDelete(req.params.id)

  if (!deletedParkade) {
    return next(
      new AppError(`Can not found any Parkade with ID : ${req.params.id}`, 404)
    )
  }
})
