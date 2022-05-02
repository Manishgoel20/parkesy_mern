import mongoose from 'mongoose'
import crypto from 'crypto'

const bookingSchema = new mongoose.Schema(
  {
    parkade: {
      type: mongoose.Schema.ObjectId,
      ref: 'Parkade',
      required: [true, 'Booking must belong to a Parkade!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User!'],
    },
    vehicleNumber: {
      type: String,
      required: [true, 'Please Enter the vehicle number'],
    },
    vehicleType: {
      type: String,
      enum: {
        values: ['bike', 'car', 'bus'],
        message: 'Vehicle is either: Bike, Car or Bus',
      },
      required: [true, 'Please Enter the vehicle number'],
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price!'],
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    bookingStatus: {
      type: String,
      enum: {
        values: ['booked', 'cancelled', 'completed'],
        message: 'Booking status either: Booked, Cancelled or Completed',
      },
      default: 'booked',
    },
    startDateTime: {
      type: Date,
      required: [true, 'Booking must have a start time!'],
    },
    endDateTime: {
      type: Date,
      required: [true, 'Booking must have a end time!'],
    },
    entryKey: String, //send this to mail
  },
  { timestamps: true }
)

// indexes
bookingSchema.index({ startDateTime: 1, endDateTime: 1 })
bookingSchema.index({ bookingStatus: 1 })
bookingSchema.index({ vehicleType: 1 })

bookingSchema.methods.createEntryKey = async function () {
  const token = crypto.randomBytes(8).toString('hex')

  const encryptedToken = crypto.createHash('sha256').update(token).digest('hex')
  this.entryKey = encryptedToken
  return token
}

// QUERY MIDDLEWARES
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName photo',
  }).populate({
    path: 'parkade',
    select: 'name images',
  })
  next()
})

export const Booking = mongoose.model('Booking', bookingSchema)
