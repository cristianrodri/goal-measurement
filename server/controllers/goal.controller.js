const Goal = require('../models/goal.model')
const Performance = require('../models/performance.model')
const allowedUpdates = require('../helpers/allowedUpdates')
const moment = require('moment')

const goalCtrl = {
  /**
   *
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
        activities: goal.activities,
        goalActivities: goal.goalActivities
      })

      await performance.save()

      res.status(201).json({
        success: true,
        data: goal
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
        data: goals
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

    try {
      updates.forEach(update => (req.goal[update] = req.body[update]))

      // update goalActivities property of the last performance belongs to this goal

      await req.goal.save()

      const performances = await Performance.find(
        {
          goal: req.goal._id,
          owner: req.user._id
        },
        null,
        {
          sort: {
            createdAt: -1
          },
          limit: 1
        }
      )

      if (performances.length) {
        performances[0].goalActivities = req.goal.activities

        // if performances found (currentDay) is false (activities is not completed yet) then modify performances[0].activities as well
        if (!performances[0].done)
          performances[0].activities = req.goal.activities
            .filter(
              activity => activity.days[moment().format('dddd').toLowerCase()]
            )
            .map(activity => ({
              activity: activity.activity
            }))

        await performances[0].save()
      }

      res.json({
        success: true,
        message: 'Your goal was updated successfully',
        data: req.goal
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
      await req.goal.remove()
      res.json({
        success: true,
        message: 'The goal was deleted successfully'
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
