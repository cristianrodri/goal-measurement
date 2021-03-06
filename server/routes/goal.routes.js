const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getGoalById,
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal
} = require('../controllers/goal.controller')

// Create goal
router.post('/goal/create/:clientUTC', auth, createGoal)

// Get all user goals
router.get('/goals/:clientUTC', auth, getGoals)

// get and delete specific goal
router
  .route('/goal/:id')
  .get(auth, getGoalById, getGoal)
  .delete(auth, getGoalById, deleteGoal)

// update specific goal
router.put('/goal/:id/:clientUTC', auth, getGoalById, updateGoal)

module.exports = router
