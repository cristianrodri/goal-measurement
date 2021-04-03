const express = require('express')
const router = express.Router()
const {
  goalBelongsToUser,
  createPerformance,
  updatePerformanceDay,
  getPerformances
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
  '/:goalId/performances/:clientUTC',
  auth,
  goalBelongsToUser,
  getPerformances
)

module.exports = router
