const express = require('express')
const router = express.Router()
const {
  goalBelongsToUser,
  createPerformance,
  updatePerformanceDay,
  getPerformance
} = require('../controllers/performance.controller')
const auth = require('../middleware/auth')

router.post(
  '/:goalId/performance/create',
  auth,
  goalBelongsToUser,
  createPerformance
)

router.put(
  '/:goalId/updatePerformanceDay/:todayPerformanceId',
  auth,
  goalBelongsToUser,
  updatePerformanceDay
)

router.get(
  '/:goalId/performances/:currentDate',
  auth,
  goalBelongsToUser,
  getPerformance
)

module.exports = router
