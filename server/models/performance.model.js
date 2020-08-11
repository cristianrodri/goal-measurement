const mongoose = require('mongoose')

const performanceSchema = new mongoose.Schema(
  {
    activities: [
      {
        activity: {
          type: String,
          maxLength: 50
        },
        reached: {
          type: Boolean,
          default: false
        }
      }
    ],
    done: {
      type: Boolean,
      default: false
    },
    goalActivities: [
      {
        days: {
          type: Object,
          required: true
        },
        activity: {
          type: String,
          required: true
        }
      }
    ],
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Goal'
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

const Performance = mongoose.model('Performance', performanceSchema)

module.exports = Performance
