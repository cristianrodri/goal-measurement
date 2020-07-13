const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const goalCtrl = require('../controllers/goal.controller')

// Create goal
router.post('/goal/create', auth, goalCtrl.createGoal)

// Get all user goals
router.get('/goals', auth, goalCtrl.getGoals)

// get, edit and delete specific goal
router.route('/goal/:id')
  .get(auth, goalCtrl.getGoal)
  .put(auth, goalCtrl.updateGoal)
  .delete(auth, goalCtrl.deleteGoal)

module.exports = router