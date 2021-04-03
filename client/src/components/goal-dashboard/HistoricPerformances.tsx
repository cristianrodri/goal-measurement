import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import DailyPerformance from './DailyPerformance'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

const useStyles = makeStyles((theme: Theme) => ({
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
    (state: RootState) => state.performance.allPerformances
  )

  return (
    <div className={classes.container}>
      {allPerformances.map((performance, i) => (
        <DailyPerformance
          key={performance._id}
          performance={performance}
          index={i}
        />
      ))}
    </div>
  )
}

export default HistoricPerformances
