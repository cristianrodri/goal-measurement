const mongoose = require('mongoose')
const moment = require('moment')

const performanceSchema = new mongoose.Schema(
  {
    performances: [
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
        date: Date,
        done: {
          type: Boolean,
          default: false
        },
        isWorkingDay: Boolean
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

performanceSchema.statics.checkLastPerformance = async (
  userId,
  newGoal,
  currentDateFromClient
) => {
  const performance = await Performance.findOne({
    goal: newGoal._id,
    owner: userId
  })

  // extract last performance
  const lastPerformance =
    performance.performances[performance.performances.length - 1]

  // check if last performance is current day (from client user). If it's true, change its activities, regardless if user has done or not

  const startCurrentDay = moment(lastPerformance.date).isSameOrAfter(
    moment(currentDateFromClient).startOf('day')
  )

  const endCurrentDay = moment(lastPerformance.date).isSameOrAfter(
    moment(currentDateFromClient).endOf('day')
  )

  if (startCurrentDay && endCurrentDay) {
    const performance = await Performance.findOneAndUpdate(
      {
        goal: newGoal._id,
        owner: userId,
        'performances._id': lastPerformance._id
      },
      {
        $set: {
          'performances.$.done': false,
          'performances.$.activities': [...newGoal.activities]
        }
      },
      {
        new: true
      }
    )

    return performance
  }

  return false
}

const Performance = mongoose.model('Performance', performanceSchema)

module.exports = Performance
