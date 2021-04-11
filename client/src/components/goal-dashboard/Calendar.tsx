import { makeStyles, Container, Typography } from '@material-ui/core'
import DaysCalendar from './DaysCalendar'
import HistoricPerformances from './HistoricPerformances'
import { useSelector } from 'react-redux'
import { averageArray, calculateReachedActivities } from '../../utils/arrays'
import { RootState } from '../../redux'
import { PerformanceState } from '../../types'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 0,
    '& > *': {
      display: 'grid',
      gridTemplateRows: 'repeat(7, 20px)',
      gridGap: 3
    }
  }
}))

const Calendar = () => {
  const classes = useStyles()
  const allPerformances = useSelector(
    (state: RootState) => state.performance.allPerformances
  )
  const workingDays = allPerformances.filter(
    performance => performance.isWorkingDay
  )

  const getPercentage = (workingDaysPerformances: PerformanceState[]) => {
    const percentages = workingDaysPerformances.map(({ activities, done }) =>
      done ? 100 : calculateReachedActivities(activities)
    )

    const averagePercentage = Math.floor(averageArray(percentages))

    return averagePercentage
  }

  const percentage = workingDays.length === 0 ? 0 : getPercentage(workingDays)

  return (
    <div>
      <Typography align="center" gutterBottom>
        You did <strong>{percentage}%</strong> of your activites until now
      </Typography>
      <Container className={classes.container}>
        <DaysCalendar />
        <HistoricPerformances />
      </Container>
    </div>
  )
}

export default Calendar
