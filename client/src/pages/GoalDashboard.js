import React, { useEffect, useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { GlobalContext } from '../context/Context'
import Title from '../components/goal-dashboard/Title'
import { Grid } from '@material-ui/core'
import Description from '../components/goal-dashboard/Description'
import Calendar from '../components/goal-dashboard/Calendar'
import Performance from './../components/goal-dashboard/Performance'
import withGoalData from './../HOC/withGoalData'
import withPerformanceData from './../HOC/withPerformanceData'
import PrintRewards from '../components/goal-dashboard/PrintRewards'
import { textCapitalize } from './../utils/text'

const GoalDashboard = props => {
  const { state, dispatchSuccessDialog } = useContext(GlobalContext)
  const { shortDescription } = state
  const history = useHistory()
  const currentDay = moment().format('dddd').toLowerCase()
  const isWeeklyRewardDay = state.weeklyReward === currentDay
  const [deserveWeeklyReward, setDeserveWeeklyReward] = useState(false)
  const weeklyReward = isWeeklyRewardDay && deserveWeeklyReward

  const sumArray = array =>
    array.reduce((number, current) => number + current, 0)

  const averageArray = array => sumArray(array) / array.length

  const previousDaysActivities = () => {
    const lastWeeklyRewardDay = moment().subtract(1, 'week').startOf('day')
    const currentDayInit = moment().startOf('day').format()

    // filter all performances by lastWeeklyRewardDay until previous current day (only check if it was a working day)
    const previousWeekPerformances = state.allPerformances
      .filter(
        ({ createdAt, isWorkingDay }) =>
          moment(createdAt).isSameOrAfter(lastWeeklyRewardDay) &&
          moment(createdAt).isBefore(currentDayInit) &&
          isWorkingDay
      )
      .map(({ percentage }) => percentage)

    const averagePercentageWeek = averageArray(previousWeekPerformances)

    // only if you achieve at least 90% the last week, you can get a weekly reward
    if (Math.floor(averagePercentageWeek) >= 30) setDeserveWeeklyReward(true)
  }

  useEffect(() => {
    document.title = textCapitalize(shortDescription)

    try {
      if (props.location.state['fromUpdatedGoal']) {
        const { message } = props.location.state
        dispatchSuccessDialog(message)
        history.replace()
      }
    } catch {}

    // calculate previous days if you deserve a weekly reward. How to know if you deserve a weekly reward? since the last "weekly reward day" until previous day you have to achieve 100% of your activities

    if (isWeeklyRewardDay) previousDaysActivities()
  }, [])

  return (
    <>
      {weeklyReward && <PrintRewards type="week" />}

      <Grid container spacing={2} justify="center">
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Title />
          <Link to={`/my-goals/${state.goalId}/edit`}>EDIT</Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Description />
        </Grid>
        <Grid item xs={12} md={6}>
          <Calendar />
        </Grid>
        <Grid item xs={12} md={8}>
          <Performance />
        </Grid>
      </Grid>
    </>
  )
}

export default withGoalData(withPerformanceData(GoalDashboard))
