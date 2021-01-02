import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import WorkingPerformance from './WorkingPerformance'
import { useSelector } from 'react-redux'

const Performance = () => {
  const isWorkingDay = useSelector(
    state => state.performance.todayPerformance.isWorkingDay
  )

  return (
    <div>
      <Paper elevation={0}>
        {isWorkingDay ? (
          <WorkingPerformance />
        ) : (
          <Typography align="center">Don't worry, take a rest</Typography>
        )}
      </Paper>
    </div>
  )
}

export default Performance
