import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a first name'],
      maxlength: [20, 'First name must have less or equal than 20 character'],
      minlength: [2, 'First name must have greater or equal to 2 character'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'User must have a last name'],
      maxlength: [20, 'Last name must have less or equal than 20 character'],
      minlength: [2, 'Last name must have greater or equal to 2 character'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      trim: true,
      lowercase: true,
      validator: [validator.isEmail, 'Please, provide a valid Email!'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password!'],
      maxlength: [15, 'Password should contain 8 to 15 letters'],
      minlength: [8, 'Password should contain atleast 8 letters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please Confirm your password!'],
      validate: {
        validator: function (el) {
          return el === this.password
        },
        message: 'Passwords are not same!',
      },
    },
    photo: String,
    role: {
      type: String,
      enum: {
        values: ['user', 'provider', 'admin'],
        message: 'Role should either: User, Provider and Admin',
      },
      default: 'user',
    },
    balanceDue: {
      type: Number,
      default: 0,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
  },
  { timestamps: true }
)

// // NOT SHOWING INACTIVE ACCOUNTS
// userSchema.pre(/^find/, function (next) {
//   // points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

// Best place to encrypt users password is at the moment we recieve it from them
userSchema.pre('save', async function (next) {
  // only run this func if password is modified
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

// when we declare methods this would available for all document associated with this schema
userSchema.methods.verifyPassword = async (
  originalPassword,
  enteredPassword
) => {
  return await bcrypt.compare(enteredPassword, originalPassword)
}

userSchema.methods.passwordChangedAfter = function (timestamp) {
  if (this.passwordChangedAt) {
    const prevTime = this.passwordChangedAt.getTime() / 1000
    return prevTime > timestamp // False if pass not updated
  }
}

userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString('hex')
  // const encryptedToken = await bcrypt.hash(token, 12);
  const encryptedToken = crypto.createHash('sha256').update(token).digest('hex')
  this.passwordResetToken = encryptedToken
  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000
  this.save({ validateBeforeSave: false })

  return token
}

// creating and exporting user model
export const User = mongoose.model('User', userSchema)
