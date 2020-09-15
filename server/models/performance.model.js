const mongoose = require('mongoose')

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

performanceSchema.statics.checkLastPerformance = async (
  userId,
  goalId,
  prevGoal,
  currentDayFromClient
) => {
  // check if today (from client day) it's working day by checking one of the activities goal has true is some activities today
  const isWorkingDayInOldGoalActivities = prevGoal.activities.some(
    activity => activity.days[currentDayFromClient]
  )

  // if today it's now working day, not modify performance and return
  if (!isWorkingDayInOldGoalActivities) return

  const performance = await Performance.findOne({
    goal: goalId,
    owner: userId
  })

  // extract last performance
  const todayPerformance = performance.performances.shift()

  // check is todayPerformance is false, if it's false, save the extracted performance
  if (!todayPerformance.done) await performance.save()
}

const Performance = mongoose.model('Performance', performanceSchema)

module.exports = Performance
