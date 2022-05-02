import express from 'express'
import { accessTo, protect } from '../controllers/authController.js'
import {
  createParkade,
  deleteParkade,
  getAllParkades,
  getMyParkades,
  getParkade,
  getParkadesNearbyAvailable,
  // getParkadesNearMeWithDetails,
  getRequestedParkades,
  updateParkade,
} from '../controllers/parkadeController.js'
import reviewRouter from '../routes/reviewRoutes.js'

const router = express.Router()

router.use('/:parkadeId/reviews', reviewRouter)
router
  .route('/parkades-near-me/:lat/:lng/:st/:et/:vehicle/:dist')
  .get(getParkadesNearbyAvailable)

router
  .route('/my-parkades')
  .get(protect, accessTo('admin', 'provider'), getMyParkades)
router
  .route('/requested-parkades')
  .get(protect, accessTo('admin'), getRequestedParkades)

router
  .route('/')
  .get(getAllParkades)
  .post(protect, accessTo('provider', 'admin'), createParkade)

router
  .route('/:id')
  .get(getParkade)
  .patch(protect, accessTo('admin', 'provider'), updateParkade)
  .delete(protect, accessTo('admin', 'provider'), deleteParkade)

export default router
