import mongoose from 'mongoose'

const parkadeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'A Parkade must have a name'],
      maxlength: [40, 'A Parkade name must have 10-40 characters'],
      minlength: [10, 'A Parkade name must have 10-40 characters'],
    },
    provider: { type: mongoose.Schema.ObjectId, ref: 'User' },
    description: {
      type: String,
      required: [true, 'Please, Let know users about the parkade'],
      trim: true,
    },
    ratingsAvg: {
      type: Number,
      default: 4.5,
      min: [1, 'Average must be aboove 1.0'],
      max: [5, 'Average must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: { type: Number, default: 0 },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: {
          values: ['Point'],
          message: 'Location must be of type: Point!',
        },
      },
      coordinates: [Number],
      address: {
        type: String,
        required: [true, 'Please, Enter parkade address!'],
      },
    },
    images: [
      {
        img: {
          type: String,
          validate: {
            validator: function (val) {
              return val.length <= 3
            },
            message: 'You can add only 3 images',
          },
        },
        publicId: { type: String },
      },
    ],
    vehicleSlots: {
      bike: {
        type: Number,
        default: 5,
        min: [5, 'A parkade should have atleast 5 Bike/Two-wheeler slots'],
        required: [true, 'Parkade should have Bike slots also!'],
      },
      car: {
        type: Number,
        defailt: 10,
        min: [10, 'A parkade should have atleast 10 Car slots'],
        required: [true, 'Parkade should have Car slots also!'],
      },
      bus: {
        type: Number,
        min: [0, 'Slots can not be below 0'],
        default: 0,
      },
    },
    pricing: {
      bike: {
        type: [Number],
        required: [
          true,
          'Bike parking price needed! format: [day, noon, night]',
        ],
        validate: {
          validator: function (val) {
            return val.length <= 3
          },
          message:
            'Please enter Day, Noon and Night parking prices only!: Bike',
        },
      },
      car: {
        type: [Number],
        required: [
          true,
          'Car parking price needed! format: [day, noon, night]',
        ],
        validate: {
          validator: function (val) {
            return val.length <= 3
          },
          message: 'Please enter Day, Noon and Night parking prices only: Car!',
        },
      },
      bus: {
        type: [Number],
        validate: {
          validator: function (val) {
            return val.length <= 3
          },
          message: 'Please enter Day, Noon and Night parking prices only: Bus!',
        },
      },
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    openingWeeks: {
      type: [Boolean],
      default: [true, true, true, true, true, false, false],
    }, //[ mon...,sat,sun]
    timings: {
      type: [String],
      default: ['05:00', '23:00'],
      validate: {
        validator: function (val) {
          return val.length == 2
        },
        message: 'Enter Opening & Closing time respectively!',
      },
    },
    features: {
      is24hr: { type: Boolean, default: true },
      isCctv: { type: Boolean, default: false },
      flexibleEntry: { type: Boolean, default: false },
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// indexes
parkadeSchema.index({ 'pricing.bike': 1, 'pricing.car': 1, 'pricing.bus': 1 })
parkadeSchema.index({ ratingsAvg: 1, ratingsQuantity: -1 })
parkadeSchema.index({ name: 1, provider: 1 })
parkadeSchema.index({ location: '2dsphere' })

// virtual fields
parkadeSchema.virtual('totalSlots').get(function () {
  return this.vehicleSlots.bike + this.vehicleSlots.car + this.vehicleSlots.bus
})

// virtually populate v kr skte h (to save DB space)
parkadeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'parkade',
  localField: '_id',
})

// parkadeSchema.virtual()
parkadeSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'parkade',
  localField: '_id',
  options: {
    match: { bookingStatus: 'booked', isPaid: 'true' },
  },
})

// creating model
export const Parkade = mongoose.model('Parkade', parkadeSchema)
