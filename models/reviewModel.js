import mongoose from 'mongoose'
import { Parkade } from './parkadeModel.js'

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: [1, 'You can give rating from 1-5'],
      max: [5, 'You can give rating from 1-5'],
      required: [true, 'Rating can not be empty!'],
    },
    parkade: {
      type: mongoose.Schema.ObjectId,
      ref: 'Parkade',
      required: [true, 'Review must belong to a Parkade.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// /////////// Double Review Prevention
reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName photo',
  })

  next()
})

reviewSchema.statics.calcAverageRatings = async function (parkadeId) {
  const stats = await this.aggregate([
    {
      $match: { parkade: parkadeId },
    },
    {
      $group: {
        _id: '$parkade',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])
  // console.log(stats);

  if (stats.length > 0) {
    await Parkade.findByIdAndUpdate(parkadeId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAvg: stats[0].avgRating,
    })
  } else {
    await Parkade.findByIdAndUpdate(parkadeId, {
      ratingsQuantity: 0,
      ratingsAvg: 4.5,
    })
  }
}

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.parkade)
})

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne()
  next()
})

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.parkade)
})

export const Review = mongoose.model('Review', reviewSchema)
