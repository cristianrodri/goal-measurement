const moment = require('moment')

// start day
// end day

const createUncheckedPerformances = (
  startDay,
  endDay,
  workingDays,
  uncheckedPerformancesArr,
  reverse = false
) => {
  const startDate = moment(startDay).startOf('day')
  const endDate = moment(endDay).startOf('day')
  const daysDiff = endDate.diff(startDate, 'days')

  for (let i = 1; reverse ? i <= daysDiff : i < daysDiff; i++) {
    const newPerformance = {}
    let date = moment(startDay)

    // if reverse is true add unchecked peformances before checkedPerformance date, otherwise add it after
    let dateOfNotWork = reverse ? date.subtract(i, 'days') : date.add(i, 'days')

    const getDayString = dateOfNotWork.format('dddd').toLowerCase()
    const isWorkingDay = workingDays.some(perf => perf[getDayString])

    newPerformance.createdAt = dateOfNotWork
    newPerformance.percentage = 0

    newPerformance.isWorkingDay = isWorkingDay

    uncheckedPerformancesArr.push(newPerformance)
  }
}

module.exports = createUncheckedPerformances
