import express from 'express'
import { protect } from '../controllers/authController.js'
import {
  createBookingCheckout,
  getCheckoutSession,
} from '../controllers/bookingController.js'

const router = express.Router()

router
  .route('/checkout-session/:parkadeId/:st/:et/:vehicle/:vehicleNum')
  .get(protect, getCheckoutSession)

router.route('/my-bookings').get(createBookingCheckout) // MY BOOKINGs KRNA H ABHI V

export default router
