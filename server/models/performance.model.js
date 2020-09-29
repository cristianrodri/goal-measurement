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
        isWorkingDay: Boolean,
        goalWorkingDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
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

performanceSchema.statics.createNewDayPerformance = async (
  goal,
  userId,
  dateFromClient,
  lastPerformance = null
) => {
  const currentDayClient = moment(dateFromClient).format('dddd').toLowerCase()
  const activitiesToday = goal.activities.filter(
    activity => activity.days[currentDayClient]
  )

  const activities = activitiesToday.length
    ? activitiesToday.map(activity => {
        delete activity.days

        return activity
      })
    : []

  const weekDays = moment.weekdays()
  const weekDaysMonToSun = [...weekDays.slice(1), ...weekDays.slice(0, 1)]

  let performancesToAdd = []

  // create previous performance in case some days were empty by checking if the difference between current day and last performance day is greater than 1
  if (lastPerformance) {
    const lastPerformanceDate = moment(lastPerformance.date).startOf('day')
    const currentDateClient = moment(dateFromClient).startOf('day')
    const daysDiff = currentDateClient.diff(lastPerformanceDate, 'days')

    if (daysDiff > 1) {
      for (let i = 1; i < daysDiff; i++) {
        const date = moment(lastPerformance.date).add(i, 'days')

        performancesToAdd.push({
          activities: [],
          date,
          isWorkingDay:
            lastPerformance.goalWorkingDays[
              moment(date).format('dddd').toLowerCase()
            ],
          goalWorkingDays: lastPerformance.goalWorkingDays
        })
      }
    }
  }

  const addNewDay = {
    activities,
    date: dateFromClient,
    isWorkingDay: !!activitiesToday.length,
    goalWorkingDays: weekDaysMonToSun.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.toLowerCase()]: goal.activities.some(
          activity => activity.days[cur.toLowerCase()]
        )
      }),
      {}
    ) // create {monday: true | false, tuesday: true | false ... until sunday}
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

  const endCurrentDay = moment(lastPerformance.date).isSameOrBefore(
    moment(currentDateFromClient).endOf('day')
  )

  const activities = newGoal.activities.map(activity => {
    delete activity.days

    return activity
  })

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
          'performances.$.activities': [...activities]
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
