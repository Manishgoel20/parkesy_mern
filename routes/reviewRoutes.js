import express from 'express'
import { accessTo, protect } from '../controllers/authController.js'
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  setParkadeAndUserIds,
  updateReview,
} from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true })
// BEFORE MERGING PARAMS : /:tourId/reviews <----not connected-----> /:reviewId
// AFTER MERGING PARAMS : /:tourId/reviews <----connected-----> /:reviewId  [now reviewRoutes can access all the previous params in the url]

router.use(protect)

router
  .route('/')
  .get(getAllReviews)
  .post(accessTo('user'), setParkadeAndUserIds, createReview)

router
  .route('/:id')
  .get(getReview)
  .patch(accessTo('admin', 'provider'), updateReview)
  .delete(accessTo('admin', 'provider'), deleteReview)

export default router
