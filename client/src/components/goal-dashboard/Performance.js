import React, { useState } from 'react'
import {
  Paper,
  Typography,
  makeStyles,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'
import WorkingPerformance from './WorkingPerformance'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  editPrev: {
    display: 'flex',
    justifyContent: 'center',
    padding: '.5rem'
  },
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const Performance = () => {
  const classes = useStyles()
  const [goalDay, setGoalDay] = useState(0) // 0 equals today, -1 equals yesterday
  const isWorkingDay = useSelector(
    state => state.performance.todayPerformance.isWorkingDay
  )
  const todayPerformance = useSelector(
    state => state.performance.todayPerformance
  )

  const lastPositionIndex =
    !todayPerformance.isWorkingDay ||
    (todayPerformance.isWorkingDay && todayPerformance.done)
      ? 2
      : 1

  const prevPerformance = useSelector(
    state =>
      state.performance.allPerformances[
        state.performance.allPerformances.length - lastPositionIndex
      ]
  )

  const handleChange = e => {
    setGoalDay(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <div>
      <Paper elevation={0}>
        <div className={classes.editPrev}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select value={goalDay} onChange={handleChange} displayEmpty>
              <MenuItem value={0}>Today</MenuItem>
              <MenuItem value={-1}>Yesterday</MenuItem>
            </Select>
          </FormControl>
        </div>
        {goalDay === 0 ? (
          isWorkingDay ? (
            <WorkingPerformance performance={todayPerformance} isToday />
          ) : (
            <Typography align="center">Don't worry, take a rest</Typography>
          )
        ) : (
          <WorkingPerformance
            performance={prevPerformance}
            lastPositionIndex={lastPositionIndex}
          />
        )}
      </Paper>
    </div>
  )
}

export default Performance
