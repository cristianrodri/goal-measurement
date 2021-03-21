import React from 'react'
import { makeStyles } from '@material-ui/core'
import DailyPerformance from './DailyPerformance'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.grey[50],
    flex: '1',
    gridAutoFlow: 'column',
    gridAutoColumns: 20,
    overflow: 'auto'
  }
}))

const HistoricPerformances = () => {
  const classes = useStyles()
  const allPerformances = useSelector(
    state => state.performance.allPerformances
  )

  return (
    <div className={classes.container}>
      {allPerformances.map((performance, i) => (
        <DailyPerformance key={i} performance={performance} index={i} />
      ))}
    </div>
  )
}

export default HistoricPerformances
