import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { GlobalContext } from '../../context/Context'
import DailyPerformance from './DailyPerformance'

const useStyles = makeStyles(theme => ({
  containerPerformances: {
    backgroundColor: theme.palette.grey[50],
    flex: '1',
    gridAutoFlow: 'column',
    gridAutoColumns: 20
  }
}))

const HistoricPerformances = () => {
  const classes = useStyles()
  const { state } = useContext(GlobalContext)

  return (
    <div className={classes.containerPerformances}>
      {state.allPerformances.map((performance, i) => (
        <DailyPerformance key={i} performance={performance} index={i} />
      ))}
    </div>
  )
}

export default HistoricPerformances
