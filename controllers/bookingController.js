import Stripe from 'stripe'
import moment from 'moment'

import { asyncHandler } from '../middlewares/Errorhandler.js'
import { Parkade } from '../models/parkadeModel.js'
import { Booking } from '../models/bookingModel.js'

export const getAllBookings = asyncHandler(async (req, res, next) => {})

export const getBooking = asyncHandler(async (req, res, next) => {})

function greeting(st) {
  const hour = st.hour()
  if (hour > 16) return 2
  if (hour > 11) return 1
  return 0
}

export const getCheckoutSession = asyncHandler(async (req, res, next) => {
  const { st, et, vehicle, parkadeId, vehicleNum } = req.params
  const parkade = await Parkade.findById(parkadeId)
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  const start = moment(st)
  const end = moment(et)

  const greetTime = greeting(start)
  const diff = end.diff(start, 'minutes')

  let amount = 0
  if (vehicle == 'bike') amount = parkade.pricing.bike[greetTime]
  else if (vehicle == 'car') amount = parkade.pricing.car[greetTime]
  else amount = parkade.pricing.bus[greetTime]

  amount = (amount / 60) * diff - req.user.balanceDue

  //   create session for booking
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/api/v1/bookings/my-bookings?parkadeId=${parkadeId}&userId=${
      req.user._id
    }&email=${
      req.user.email
    }&st=${st}&et=${et}&vehicle=${vehicle}&price=${amount}&vehicleNum=${vehicleNum}`,

    cancel_url: `${req.protocol}://${req.get('host')}/parkades/${parkade._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.parkadeId,
    line_items: [
      {
        name: parkade.name,
        description: parkade.description,
        amount: amount * 100,
        currency: 'inr',
        quantity: 1,
      },
    ], //add image later!!
  })

  //   create response
  res.status(200).json({ status: 'success', session })
})

export const createBookingCheckout = asyncHandler(async (req, res, next) => {
  const { parkadeId, userId, price, st, et, vehicle, vehicleNum, email } =
    req.query
  if (!parkadeId && !userId && !price) return next()

  const key = Math.floor(Math.random() * 100000000) + 1

  const booking = await Booking.create({
    parkade: parkadeId,
    user: userId,
    vehicleNumber: vehicleNum,
    price,
    vehicleType: vehicle,
    startDateTime: st,
    endDateTime: et,
    entryKey: key,
  })

  if (!booking)
    return next(
      new AppError(`Something went wrong while booking! Please try again!`, 403)
    )

  // send a nice mail

  res.status(200).json({
    status: 'success',
    message: `Reset token is sent to ${email}!`,
    data: { booking },
  })
})
