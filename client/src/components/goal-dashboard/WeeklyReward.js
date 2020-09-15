import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { averageArray } from '../../utils/arrays'
import PrintRewards from './PrintRewards'

const WeeklyReward = () => {
  const currentDay = moment().format('dddd').toLowerCase()
  const weeklyRewardDay = useSelector(state => state.goal.weeklyReward)
  const allPerformances = useSelector(
    state => state.performance.allPerformances
  )
  const isWeeklyRewardDay = weeklyRewardDay === currentDay
  const [deserveWeeklyReward, setDeserveWeeklyReward] = useState(false)
  const weeklyReward = isWeeklyRewardDay && deserveWeeklyReward

  const previousDaysActivities = () => {
    const lastWeeklyRewardDay = moment().subtract(1, 'week').startOf('day')
    const currentDayInit = moment().startOf('day')

    // filter all performances by lastWeeklyRewardDay until previous current day (only check if it was a working day)
    const previousWeekPerformances = allPerformances
      .filter(
        ({ date, isWorkingDay }) =>
          moment(date).isSameOrAfter(lastWeeklyRewardDay) &&
          moment(date).isBefore(currentDayInit) &&
          isWorkingDay
      )
      .map(({ percentage }) => percentage)

    const averagePercentageWeek = averageArray(previousWeekPerformances)

    // only if you achieve at least 80% the last week, you can get a weekly reward
    if (Math.floor(averagePercentageWeek) >= 80) setDeserveWeeklyReward(true)
  }

  useEffect(() => {
    // calculate previous days if you deserve a weekly reward. How to know if you deserve a weekly reward? since the last "weekly reward day" until previous day you have to achieve 100% of your activities
    if (isWeeklyRewardDay) previousDaysActivities()
  }, [])

  if (weeklyReward) return <PrintRewards type="week" />
  else return null
}

export default WeeklyReward
