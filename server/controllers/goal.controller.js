const Goal = require('../models/goal.model')
const Performance = require('../models/performance.model')
const allowedUpdates = require('../helpers/allowedUpdates')

const goalCtrl = {
  /**
   * // middleware
   * @desc Get goal by :id param
   * @access private
   */
  async getGoalById(req, res, next) {
    try {
      const goal = await Goal.findOne({
        _id: req.params.id,
        owner: req.user._id
      })

      if (!goal) {
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Goal is not found'
        })
      }

      req.goal = goal
      next()
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Create new goal
   * @route /api/goal/create
   * @method POST
   * @access private
   */
  async createGoal(req, res) {
    try {
      const goal = new Goal({ owner: req.user._id, ...req.body })
      await goal.save()

      // after creating the goal, create the first performance of this goal, regardless if the day of the goal was created is working date or not.

      const performance = new Performance({
        goal: goal._id,
        owner: req.user._id,
        activities: goal.activities
      })

      await performance.save()

      const newDayPerformance = await Performance.createNewDayPerformance(
        goal,
        req.user._id,
        req.params.currentDate
      )

      res.status(201).json({
        success: true,
        data: {
          goal,
          allPerformances: newDayPerformance.performance.performances.slice(
            0,
            -1
          ),
          todayPerformance: newDayPerformance.lastPerformance
        }
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
   * @desc Get all the user goals
   * @route /api/goals
   * @method GET
   * @access private
   */
  async getGoals(req, res) {
    try {
      const goals = await Goal.find({ owner: req.user._id })

      res.json({
        success: true,
        data: !goals ? [] : goals
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      })
    }
  },

  /**
   * @desc Get one goal by id
   * @route /api/goal/:id
   * @method GET
   * @access private
   */
  async getGoal(req, res) {
    res.json({
      success: true,
      data: req.goal
    })
  },

  /**
   * @desc Update one goal by id
   * @route /api/goal/:id
   * @method PUT
   * @access private
   */
  async updateGoal(req, res) {
    const updates = Object.keys(req.body)
    const isValidUpdate = allowedUpdates(
      [
        'shortDescription',
        'bigDescription',
        'activities',
        'end',
        'completed',
        'rewards',
        'weeklyReward'
      ],
      updates
    )

    if (!isValidUpdate)
      return res.status(401).json({
        success: false,
        error: true,
        message: 'Not allowed to update'
      })

    // const prevGoal = { activities: req.goal.activities }

    try {
      updates.forEach(update => (req.goal[update] = req.body[update]))

      await req.goal.save()

      // update activities property of the last day performance belongs to this goal
      const performance = await Performance.checkLastPerformance(
        req.user._id,
        req.goal,
        req.params.currentDate
      )

      res.json({
        success: true,
        message: 'Your goal was updated successfully',
        data: {
          goal: req.goal,
          todayPerformance: performance
            ? performance.performances[performance.performances.length - 1]
            : false
        }
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
   * @desc Delete one goal by id
   * @route /api/goal/:id
   * @method DELETE
   * @access private
   */
  async deleteGoal(req, res) {
    try {
      const goal = await req.goal.remove()

      res.json({
        success: true,
        message: 'The goal was deleted successfully',
        goalId: goal._id
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      })
    }
  }
}

module.exports = goalCtrl
