import ApiFeatures from '../middlewares/ApiFeatures.js'
import { AppError, asyncHandler } from '../middlewares/Errorhandler.js'
import { Parkade } from '../models/parkadeModel.js'

/////////////////////////// PARKADE NEARBY

/////////////////////////// PARKADE WITHIN

/////////////////////////// GET ALL PARKADE
export const getAllParkades = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Parkade.find(), req.query)
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
    .populate({
      path: 'providers',
      select: 'name photo -__v -passwordChangedAt',
    })
    .populate('reviews')

  if (!parkade) {
    return next(
      new AppError(`Can not found any Tour with ID : ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ status: 'success', data: { parkade } })
})

/////////////////////////// CREATE PARKADE
export const createParkade = asyncHandler(async (req, res, next) => {
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
      new AppError(`Can not found any Tour with ID : ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ status: 'success', data: { parkade: updatedParkade } })
})

/////////////////////////// DELETE PARKADE
export const deleteParkade = asyncHandler(async (req, res, next) => {
  const deletedParkade = await Parkade.findByIdAndDelete(req.params.id)

  if (!deletedParkade) {
    return next(
      new AppError(`Can not found any Tour with ID : ${req.params.id}`, 404)
    )
  }
})
