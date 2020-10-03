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
      trim: true,
      maxlength: 500
    },
    activities: [
      {
        days: {
          type: Object,
          default: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
          }
        },
        activity: {
          type: String,
          trim: true,
          maxlength: 60,
          required: [true, 'Activity name is required']
        }
      }
    ],
    end: Date,
    completed: {
      type: Boolean,
      default: false
    },
    rewards: {
      small: [
        {
          type: String,
          trim: true,
          maxlength: 50
        }
      ],
      medium: [
        {
          type: String,
          trim: true,
          maxlength: 50
        }
      ],
      large: [
        {
          type: String,
          trim: true,
          maxlength: 50
        }
      ]
    },
    weeklyReward: {
      type: String,
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    },
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

// Delete all performances linked with goalId before the goal is deleted
goalSchema.pre('remove', function (next) {
  const goal = this

  Performance.deleteOne({ goal: goal._id }, (err, res) => {
    if (err) throw new Error(err)
    next()
  })
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
