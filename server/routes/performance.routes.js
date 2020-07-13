const express = require('express')
const router = express.Router()
const performanceCtrl = require('../controllers/performance.controller')
const auth = require('../middleware/auth')

router.post(
  '/:goalId/performance/create',
  auth,
  performanceCtrl.goalBelongsToUser,
  performanceCtrl.createPerformance
)

router.get(
  '/:goalId/performances',
  auth,
  performanceCtrl.goalBelongsToUser,
  performanceCtrl.getPerformancesByGoalId
)

router.get(
  '/:goalId/performance',
  auth,
  performanceCtrl.goalBelongsToUser,
  performanceCtrl.getPerformance
)

router.put(
  '/:goalId/performance/:performanceId',
  auth,
  performanceCtrl.goalBelongsToUser,
  performanceCtrl.updatePerformance
)

module.exports = router
