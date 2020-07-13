const Performance = require('../models/performance.model')
const Goal = require('../models/goal.model')
const allowedUpdates = require('../helpers/allowedUpdates')
const moment = require('moment')
const createUncheckedPerformances = require('../helpers/createUncheckedPerformances')

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

      req.goalId = req.params.goalId
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
   * @route /api/v1/:goalId/performance/create
   * @method POST
   * @access private
   */
  async createPerformance(req, res) {
    try {
      // Create new performance only if goal (exists) id belongs to user
      const performance = new Performance({
        ...req.body,
        goal: req.goalId,
        owner: req.user._id,
        goalActivities: req.goal.activities
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
   * @desc Get all performances by specific goal
   * @route /api/v1/:goalId/performances
   * @method GET
   * @access private
   */
  async getPerformancesByGoalId(req, res) {
    try {
      const performances = await Performance.find({
        goal: req.goalId,
        owner: req.user._id
      })

      if (!performances.length)
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Performances are not found',
          status: 404
        })

      // return to frontend an array of object of all performances between initial date of the goal and current day. If performance doesn't have data any day for two reasons: it wasn't a working day or user didn't check his/her progress, create a performance object with 0% progress or with showing that it wasn't a working day

      const checkedPerformances = performances.map(performance => ({
        percentage: Math.floor(
          (performance.activities.filter(activity => activity.reached).length /
            performance.activities.length) *
            100
        ),
        workingDays: performance.goalActivities.map(activity => activity.days),
        isWorkingDay: true,
        createdAt: performance.createdAt,
        activities: performance.activities,
        done: performance.done,
        _id: performance._id
      }))

      let uncheckedPerformances = []

      // create unchecked performances between created goal date and first checked performance
      const createdGoalDate = moment(req.goal.createdAt).startOf('day')
      const firstCheckedPerformance = moment(req.goal.createdAt).startOf('day')
      const daysDiff = firstCheckedPerformance.diff(createdGoalDate, 'days')

      if (daysDiff)
        createUncheckedPerformances(
          req.goal.createdAt,
          checkedPerformances[0].createdAt,
          checkedPerformances[0].workingDays,
          uncheckedPerformances,
          true
        )

      checkedPerformances.forEach((performance, i, arr) => {
        const isLastPerformance = i === arr.length - 1
        const lastPerformanceDate = moment(
          arr[arr.length - 1].createdAt
        ).startOf('day')

        const currentPerformance = moment(performance.createdAt).startOf('day')
        let nextPerformance = moment(new Date()).startOf('day')

        if (!isLastPerformance)
          nextPerformance = moment(arr[i + 1].createdAt).startOf('day')
        let daysDiff = nextPerformance.diff(currentPerformance, 'days')

        // If it's the lastPerformance change daysDiff with current day minus last performance. If daysDiff is greater than one call create unchecked performances again in the lines below

        if (isLastPerformance)
          daysDiff = moment().startOf('day').diff(lastPerformanceDate, 'days')

        // if daysDiff is greater than one, it does mean performances it wasn't checked in days between currentPerformance and nextPerformance. If it's the case create remained performances

        if (daysDiff > 1)
          createUncheckedPerformances(
            performance,
            daysDiff,
            uncheckedPerformances
          )
      })

      // sort dates by oldest to newest
      const allPerformances = checkedPerformances
        .concat(uncheckedPerformances)
        .sort((a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix())

      // check if there is "today performance" in db
      const todayPerformance = allPerformances.filter(performance =>
        moment(performance.createdAt).isSameOrAfter(moment().startOf('day'))
      )

      // if todayPerformance is uncompleted, remove it from all performances
      if (todayPerformance.length && !todayPerformance[0].done)
        allPerformances.pop()

      res.json({
        success: true,
        allPerformances,
        todayPerformance
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Get one performance by specific goal (today performance)
   * @route /api/v1/:goalId/performance
   * @method GET
   * @access private
   */
  async getPerformance(req, res) {
    try {
      const performance = await Performance.findOne({
        goal: req.goalId,
        createdAt: {
          $gte: moment().startOf('day'),
          $lte: moment().endOf('day')
        }
      })

      if (!performance)
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Performance is not found',
          status: 404
        })

      res.json({
        success: true,
        data: performance
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Update one performance by specific goal
   * @route /api/v1/:goalId/performance/:performanceId
   * @method PUT
   * @access private
   */
  async updatePerformance(req, res) {
    const updates = Object.keys(req.body)
    const isValidUpdates = allowedUpdates(['done', 'activities'], updates)

    if (!isValidUpdates)
      return res
        .status(400)
        .json({ success: false, error: true, message: 'Invalid updates' })

    try {
      const performance = await Performance.findOneAndUpdate(
        {
          _id: req.params.performanceId,
          goal: req.goalId,
          owner: req.user._id
        },
        {
          activities: req.body.activities,
          done: req.body.done
        },
        {
          new: true
        }
      )

      if (!performance)
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Performance is not found'
        })

      const updatedPerformance = { ...performance._doc }

      delete updatedPerformance.goal
      delete updatedPerformance.owner
      delete updatedPerformance.updatedAt
      delete updatedPerformance.__v
      ;(updatedPerformance.isWorkingDay = true),
        (updatedPerformance.workingDays = updatedPerformance.goalActivities.map(
          activity => activity.days
        ))
      updatedPerformance.percentage = Math.floor(
        (updatedPerformance.activities.filter(activity => activity.reached)
          .length /
          updatedPerformance.activities.length) *
          100
      )

      delete updatedPerformance.goalActivities

      res.json({
        success: true,
        data: updatedPerformance
      })
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: true, message: error.message })
    }
  }
}

module.exports = performanceCtrl
