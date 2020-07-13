import React, { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { GlobalContext } from '../../context/Context'
import moment from 'moment'
import WorkingPerformance from './WorkingPerformance'

const Performance = () => {
  const { state } = useContext(GlobalContext)
  const currentDay = moment().format('dddd').toLowerCase()
  const isWorkingDay = state.activities.some(
    activity => activity.days[currentDay]
  ) // Check if today is "Working day" by checking if one of the activities is true today

  return (
    <div>
      <Paper elevation={0}>
        {isWorkingDay ? (
          <WorkingPerformance />
        ) : (
          <p>Don't worry, take a rest</p>
        )}
      </Paper>
    </div>
  )
}

export default Performance
