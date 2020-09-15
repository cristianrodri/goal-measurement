const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Goal = require('./goal.model')
const Performance = require('./performance.model')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid')
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password'))
          throw new Error('Password cannot contain "password"')
      }
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    avatar: Buffer
  },
  {
    timestamps: true
  }
)

userSchema.virtual('goals', {
  ref: 'Goal',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.avatar

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('User not found')

  const matchedPassword = await bcrypt.compare(password, user.password)

  if (!matchedPassword) {
    throw new Error('Wrong password!')
  }

  return user
}

userSchema.methods.generateAuthToken = function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY)

  return token
}

// Hash plain password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  next()
})

// Delete all user goals before the user is removed
userSchema.pre('remove', async function (next) {
  const user = this

  await Goal.deleteMany({ owner: user._id }) // delete all user goals
  await Performance.deleteMany({ owner: user._id }) // delete all user performances
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
