import ApiFeatures from '../middlewares/ApiFeatures.js'
import { asyncHandler } from '../middlewares/Errorhandler.js'
import { Review } from '../models/reviewModel.js'

export const setParkadeAndUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.parkade) req.body.parkade = req.params.parkadeId
  if (!req.body.user) req.body.user = req.user.id
  next()
}

/////////////////////////// GET ALL REVIEWS
export const getAllReviews = asyncHandler(async (req, res, next) => {
  let filter = {}
  if (req.params.parkadeId) filter = { parkade: req.params.parkadeId }
  const features = new ApiFeatures(Review.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const reviews = await features.query

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  })
})

/////////////////////////// GET REVIEW
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new AppError(`Can not found any Review with ID : ${req.params.id}`, 404)
    )
  }

  res.status(201).json({
    status: 'success',
    data: { review },
  })
})

/////////////////////////// CREATE REVIEW
export const createReview = asyncHandler(async (req, res, next) => {
  // Allows nested route
  if (!req.body.parkade) req.body.parkade = req.params.parkadeId
  // Remember User's info is stored in protect middleware we can take users id from there!!!
  if (!req.body.user) req.body.user = req.user.id

  const newReview = await Review.create(req.body)

  if (!newReview) {
    return next(new AppError(`Bad request sent on ID : ${req.params.id}`, 401))
  }

  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  })
})

/////////////////////////// DELETE REVIEW
export const deleteReview = asyncHandler(async (req, res, next) => {
  const deleteReview = await Review.findByIdAndDelete(req.params.id)

  if (!deleteReview) {
    return next(
      new AppError(`Can not found any Review with ID : ${req.params.id}`, 404)
    )
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

/////////////////////////// UPDATE REVIEW
export const updateReview = asyncHandler(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!updatedReview) {
    return next(
      new AppError(`Can not found any Review with ID : ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ status: 'success', data: { review: updatedReview } })
})
