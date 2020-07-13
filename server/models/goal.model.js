const mongoose = require('mongoose')
const Performance = require('./performance.model')

const goalSchema = new mongoose.Schema(
  {
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    bigDescription: {
      type: String,
      trim: true
    },
    activities: [
      {
        days: Object,
        activity: String
      }
    ],
    end: Date,
    completed: {
      type: Boolean,
      default: false
    },
    rewards: {
      small: Array,
      medium: Array,
      large: Array
    },
    weeklyReward: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

// Delete all performances linked with goalId
goalSchema.pre('remove', async function (next) {
  const goal = this

  await Performance.deleteMany({ goal: goal._id })
  next()
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
