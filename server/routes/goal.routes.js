const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const goalCtrl = require('../controllers/goal.controller')

// Create goal
router.post('/goal/create', auth, goalCtrl.createGoal)

// Get all user goals
router.get('/goals', auth, goalCtrl.getGoals)

// get, edit and delete specific goal
router
  .route('/goal/:id')
  .get(auth, goalCtrl.getGoalById, goalCtrl.getGoal)
  .put(auth, goalCtrl.getGoalById, goalCtrl.updateGoal)
  .delete(auth, goalCtrl.getGoalById, goalCtrl.deleteGoal)

// router.param('id', goalCtrl.getGoalById)

module.exports = router
