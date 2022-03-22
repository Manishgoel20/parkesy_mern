import express from 'express'
import { accessTo, protect } from '../controllers/authController.js'
import {
  createParkade,
  deleteParkade,
  getAllParkades,
  getParkade,
  updateParkade,
} from '../controllers/parkadeController.js'
import reviewRouter from '../routes/reviewRoutes.js'

const router = express.Router()

router.use('/:parkadeId/reviews', reviewRouter)

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
