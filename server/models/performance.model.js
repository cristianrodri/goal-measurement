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
            reached: Boolean
          }
        ],
        date: Date,
        done: Boolean,
        isWorkingDay: Boolean,
        goalActivities: [
          {
            activity: String,
            days: {
              type: Object,
              default: {
                monday: Boolean,
                tuesday: Boolean,
                wednesday: Boolean,
                thursday: Boolean,
                friday: Boolean,
                saturday: Boolean,
                sunday: Boolean
              }
            }
          }
        ],
        goalDeadline: Date
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

performanceSchema.statics.createNewDayPerformance = async (
  goal,
  userId,
  utcClient = undefined,
  lastPerformance = undefined
) => {
  const currentDayClient = moment(moment().utcOffset(utcClient))
    .format('dddd')
    .toLowerCase()
  const activitiesToday = goal.activities.filter(
    activity => activity.days[currentDayClient]
  )

  const activities = activitiesToday.length
    ? activitiesToday.map(activity => {
        delete activity.days

        return {
          activity: activity.activity,
          reached: false
        }
      })
    : []

  let performancesToAdd = []

  // create previous performance in case some days were empty by checking if the difference between current day and last performance day is greater than 1
  if (lastPerformance) {
    const lastPerformanceDate = moment(
      moment(lastPerformance.date).utcOffset(utcClient)
    ).startOf('day')
    const currentDateClient = moment(moment().utcOffset(utcClient)).startOf(
      'day'
    )
    const daysDiff = currentDateClient.diff(lastPerformanceDate, 'days')

    if (daysDiff > 1) {
      for (let i = 1; i < daysDiff; i++) {
        const date = moment(moment(lastPerformance.date).utcOffset(utcClient))
          .add(i, 'days')
          .format()

        const isSameOrAfterPrevGoalDeadline = moment(
          moment(date).utcOffset(utcClient).startOf('day')
        ).isSameOrAfter(
          moment(lastPerformance.goalDeadline)
            .utcOffset(utcClient)
            .startOf('day')
        )

        performancesToAdd.push({
          activities: isSameOrAfterPrevGoalDeadline
            ? []
            : lastPerformance.goalActivities
                .filter(
                  activity =>
                    activity.days[
                      moment(moment(date).utcOffset(utcClient))
                        .format('dddd')
                        .toLowerCase()
                    ]
                )
                .map(activity => ({
                  activity: activity.activity,
                  reached: false
                })),
          date,
          done: false,
          isWorkingDay: isSameOrAfterPrevGoalDeadline
            ? false
            : lastPerformance.goalActivities.some(
                activity =>
                  activity.days[
                    moment(moment(date).utcOffset(utcClient))
                      .format('dddd')
                      .toLowerCase()
                  ]
              ),
          goalActivities: lastPerformance.goalActivities,
          goalDeadline: lastPerformance.goalDeadline
        })
      }
    }
  }

  const addNewDay = {
    activities,
    date: moment().format(),
    done: false,
    isWorkingDay: !!activitiesToday.length,
    goalDeadline: goal.end,
    goalActivities: goal.activities
  }

  performancesToAdd.push(addNewDay)

  const performance = await Performance.findOneAndUpdate(
    {
      goal: goal._id,
      owner: userId
    },
    {
      $push: {
        performances: {
          $each: performancesToAdd
        }
      }
    },
    {
      new: true
    }
  )

  return {
    performance,
    lastPerformance:
      performance.performances[performance.performances.length - 1]
  }
}

performanceSchema.statics.checkLastPerformance = async (
  userId,
  newGoal,
  clientUTC
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
    moment(moment().utcOffset(clientUTC)).startOf('day')
  )

  const endCurrentDay = moment(lastPerformance.date).isSameOrBefore(
    moment(moment().utcOffset(clientUTC)).endOf('day')
  )

  if (startCurrentDay && endCurrentDay) {
    const currentDayClient = moment(moment().utcOffset(clientUTC))
      .format('dddd')
      .toLowerCase()
    const activitiesToday = newGoal.activities.filter(
      activity => activity.days[currentDayClient]
    )

    const activities = activitiesToday.length
      ? activitiesToday.map(activity => {
          delete activity.days

          return {
            activity: activity.activity,
            reached: false
          }
        })
      : []

    const performance = await Performance.findOneAndUpdate(
      {
        goal: newGoal._id,
        owner: userId,
        'performances._id': lastPerformance._id
      },
      {
        $set: {
          'performances.$.done': false,
          'performances.$.activities': [...activities],
          'performances.$.isWorkingDay': !!activitiesToday.length
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
