import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Title from '../components/goal-dashboard/Title'
import { Grid } from '@material-ui/core'
import Description from '../components/goal-dashboard/Description'
import Calendar from '../components/goal-dashboard/Calendar'
import Performance from './../components/goal-dashboard/Performance'
import { textCapitalize } from './../utils/text'
import WeeklyReward from '../components/goal-dashboard/WeeklyReward'
import withPerformanceData from '../HOC/withPerformanceData'
import { useDispatch, useSelector } from 'react-redux'
import { displayDialog } from './../redux/dialogs/dialogActions'
import withGoal from './../HOC/withGoal'
import EndDateReached from '../components/goal-dashboard/EndDateReached'

const GoalDashboard = props => {
  const history = useHistory()
  const { shortDescription, _id } = useSelector(
    state => state.goal.selectedGoal
  )
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = textCapitalize(shortDescription)

    try {
      if (props.location.state['fromUpdatedGoal']) {
        const { message } = props.location.state
        dispatch(displayDialog(message))
        history.replace()
      }
    } catch {}
  }, [])

  return (
    <>
      <WeeklyReward />
      <EndDateReached />

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
          <Link to={`/my-goals/${_id}/edit`}>EDIT</Link>
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

export default withGoal(withPerformanceData(GoalDashboard))
