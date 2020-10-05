import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { SecondaryTitle } from '../Title'

const useStyles = makeStyles(theme => ({
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const NewEndDate = () => {
  const classes = useStyles()
  const endGoalDate = useSelector(state => state.goal.selectedGoal.end)
  const [date, setDate] = useState(endGoalDate)

  return (
    <div className={classes.dateContainer}>
      <SecondaryTitle>Add the goal's new end date</SecondaryTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="d MMMM yyyy"
          value={date}
          onChange={changedDate => setDate(changedDate)}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          disablePast
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default NewEndDate
