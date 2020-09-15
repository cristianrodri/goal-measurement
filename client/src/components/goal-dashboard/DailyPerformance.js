import React, { useState } from 'react'
import { Popover, Typography, makeStyles } from '@material-ui/core'
import { red, green, lime, grey } from '@material-ui/core/colors'
import moment from 'moment'
import { useSelector } from 'react-redux'

const COMPLETED = 'COMPLETED'
const BETWEEN_80_AND_99 = '80-99'
const BETWEEN_50_AND_79 = '50-79'
const BETWEEN_20_AND_49 = '20-49'
const BETWEEN_1_AND_19 = '1-19'
const DID_NOTHING = '0'
const NOT_WORKING_DAY = 'NOT_WORKING_DAY'

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  typography: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: grey[100],
    padding: theme.spacing(1)
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

const DailyPerformance = ({ performance, index }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const selectedGoal = useSelector(state => state.goal.selectedGoal)

  const handlePopoverOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <>
      <span
        key={moment(performance.date).unix()}
        className={classes[progressColor(performance)]}
        style={{
          gridRow:
            index === 0
              ? moment(selectedGoal.createdAt).day() !== 0
                ? moment(selectedGoal.createdAt).day()
                : 7
              : 'auto'
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      ></span>
      <Popover
        id="mouse-over-popover"
        anchorEl={anchorEl}
        open={open}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          className={classes.typography}
        >
          {performance.percentage}%
          <small>
            {moment(performance.createdAt).format('dddd, DD-MMM-YYYY')}
          </small>
        </Typography>
      </Popover>
    </>
  )
}

export default DailyPerformance
