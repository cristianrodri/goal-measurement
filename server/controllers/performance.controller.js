const Performance = require('../models/performance.model')
const Goal = require('../models/goal.model')
const moment = require('moment')

const performanceCtrl = {
  // middleware
  async goalBelongsToUser(req, res, next) {
    try {
      const goal = await Goal.findOne({
        _id: req.params.goalId,
        owner: req.user._id
      })

      if (!goal)
        return res
          .status(404)
          .json({ success: false, error: true, message: 'Goal is not found' })

      req.goal = goal

      next()
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: true, message: error.message })
    }
  },

  /**
   * @desc Create new 'day' performance by specific goal
   * @route /api/:goalId/performance/create
   * @method POST
   * @access private
   */
  async createPerformance(req, res) {
    try {
      // Create new performance only if goal (exists) id belongs to user
      const performance = new Performance({
        ...req.body,
        goal: req.goal._id,
        owner: req.user._id
      })

      await performance.save()

      res.status(201).json({
        success: true,
        data: performance
      })
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: true, message: error.message })
    }
  },

  /**
   * @desc Update one performance by specific goal
   * @route /api/:goalId/updatePerformanceDay/:performanceId
   * @method PUT
   * @access private
   */
  async updatePerformanceDay(req, res) {
    try {
      // update when is new day and when performances is checked
      const performance = await Performance.findOneAndUpdate(
        {
          goal: req.goal._id,
          owner: req.user._id,
          'performances._id': req.params.todayPerformanceId
        },
        {
          $set: {
            'performances.$.done': req.body.done,
            'performances.$.activities': [...req.body.activities]
          }
        },
        {
          new: true
        }
      )

      res.json({
        success: true,
        data: performance.performances[performance.performances.length - 1]
      })
    } catch (error) {
      res.status(400).json({ success: false, error: true, message: error })
    }
  },

  /**
   * @desc Update one performance by specific goal
   * @route /api/:goalId/performances
   * @method GET
   * @access private
   */
  async getPerformance(req, res) {
    try {
      const currentClientDateUTC = +req.params.currentDate

      let performance = await Performance.findOne({
        goal: req.goal._id
      })

      if (!performance)
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Performance not found'
        })

      let lastPerformance =
        performance.performances[performance.performances.length - 1]

      console.log(currentClientDateUTC)

      const clientDate = moment().utcOffset(currentClientDateUTC)

      const isPreviousDay = moment(lastPerformance.date).isBefore(
        moment(clientDate).startOf('day')
      )

      console.log(isPreviousDay)
      console.log(moment(lastPerformance.date))
      console.log(clientDate)
      console.log(moment(clientDate))

      // if last performance is not current day, create new one
      if (isPreviousDay) {
        const newPerformance = await Performance.createNewDayPerformance(
          req.goal,
          req.user._id,
          clientDate,
          lastPerformance,
          currentClientDateUTC
        )

        performance = newPerformance.performance
        lastPerformance = newPerformance.lastPerformance
      }

      res.json({
        success: true,
        data: {
          allPerformances: performance.performances,
          todayPerformance: lastPerformance,
          isPreviousDay,
          lastPerformance: moment(lastPerformance.date),
          clientDate: moment(clientDate),
          date: clientDate
        }
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  }
}

module.exports = performanceCtrl
