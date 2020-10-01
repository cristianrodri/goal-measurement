import React from 'react'
import { Paper } from '@material-ui/core'
import WorkingPerformance from './WorkingPerformance'
import { useSelector } from 'react-redux'

const Performance = () => {
  const isWorkingDay = useSelector(state => state.performance.todayPerformance)

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
