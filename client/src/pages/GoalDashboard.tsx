import { useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import Title from '../components/goal-dashboard/Title'
import { Grid } from '@material-ui/core'
import Description from '../components/goal-dashboard/Description'
import Calendar from '../components/goal-dashboard/Calendar'
import Performance from './../components/goal-dashboard/Performance'
import WeeklyReward from '../components/goal-dashboard/WeeklyReward'
import { useDispatch, useSelector } from 'react-redux'
import { displayDialog } from '../redux/dialog/dialogActions'
import { RootState } from '../redux'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import moment from 'moment'
import EndDateReached from '../components/goal-dashboard/EndDateReached'
import { useSelectedGoal } from './../hooks/useSelectedGoal'
import { usePerformanceData } from '../hooks/usePerformanceData'
import Loading from '../components/Loading'

const GoalDashboard = (
  props: RouteComponentProps<
    { id: string },
    Record<string, never>,
    { fromUpdatedGoal: boolean; message: string }
  >
) => {
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  )
  const goalId = selectedGoal?._id
  const dispatch = useDispatch()
  useDocumentTitle(selectedGoal?.shortDescription)
  useSelectedGoal(props.match.params.id)
  const { isLoading } = usePerformanceData()

  useEffect(() => {
    if (props.location.state?.fromUpdatedGoal)
      dispatch(displayDialog(props.location.state.message))
  }, [])

  if (isLoading) return <Loading />

  // after selectedGoal is dispatched check if it is the deadline
  if (selectedGoal) {
    const isEndGoalDate = moment().isSameOrAfter(
      moment(selectedGoal.end).startOf('day')
    )

    if (isEndGoalDate) return <EndDateReached goal={selectedGoal} />
  }

  return (
    <>
      <WeeklyReward />

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
          <Link to={`/my-goals/${goalId}/edit`}>EDIT</Link>
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

export default GoalDashboard
