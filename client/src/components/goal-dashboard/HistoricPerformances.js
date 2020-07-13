import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { red, green, lime, grey } from '@material-ui/core/colors'
import { GlobalContext } from '../../context/Context'
import moment from 'moment'

const COMPLETED = 'COMPLETED'
const BETWEEN_80_AND_99 = '80-99'
const BETWEEN_50_AND_79 = '50-79'
const BETWEEN_20_AND_49 = '20-49'
const BETWEEN_1_AND_19 = '1-19'
const DID_NOTHING = '0'
const NOT_WORKING_DAY = 'NOT_WORKING_DAY'

const useStyles = makeStyles(theme => ({
  containerPerformances: {
    backgroundColor: 'steelblue',
    flex: '1',
    gridAutoFlow: 'column',
    gridAutoColumns: 20
  },
  [COMPLETED]: {
    backgroundColor: green[700]
  },
  [BETWEEN_80_AND_99]: {
    backgroundColor: green[600]
  },
  [BETWEEN_50_AND_79]: {
    backgroundColor: green[400]
  },
  [BETWEEN_20_AND_49]: {
    backgroundColor: lime[400]
  },
  [BETWEEN_1_AND_19]: {
    backgroundColor: red[400]
  },
  [DID_NOTHING]: {
    backgroundColor: red[700]
  },
  [NOT_WORKING_DAY]: {
    backgroundColor: grey[300]
  }
}))

const progressColor = ({ percentage, isWorkingDay }) => {
  if (isWorkingDay) {
    switch (true) {
      case percentage === 100:
        return COMPLETED
      case percentage >= 80:
        return BETWEEN_80_AND_99
      case percentage >= 50:
        return BETWEEN_50_AND_79
      case percentage >= 20:
        return BETWEEN_20_AND_49
      case percentage >= 1:
        return BETWEEN_1_AND_19
      default:
        return DID_NOTHING
    }
  } else {
    return NOT_WORKING_DAY
  }
}

const HistoricPerformances = () => {
  const classes = useStyles()
  const { state } = useContext(GlobalContext)

  return (
    <div className={classes.containerPerformances}>
      {state.allPerformances.map((performance, i) => (
        <span
          key={moment(performance.createdAt).unix()}
          className={classes[progressColor(performance)]}
          style={{
            gridRow:
              i === 0
                ? moment(state.createdAt).day() !== 0
                  ? moment(state.createdAt).day()
                  : 7
                : 'auto'
          }}
        ></span>
      ))}
    </div>
  )
}

export default HistoricPerformances
