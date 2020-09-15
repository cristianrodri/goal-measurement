const express = require('express')
const router = express.Router()
const {
  goalBelongsToUser,
  // checkPerformance,
  createPerformance,
  createNewDay,
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

router.put('/:goalId/createNewDay', auth, goalBelongsToUser, createNewDay)

router.put(
  '/:goalId/updatePerformanceDay/:performanceId/:todayPerformanceId',
  auth,
  goalBelongsToUser,
  updatePerformanceDay
)

router.get('/:goalId/performances', auth, goalBelongsToUser, getPerformance)

module.exports = router
