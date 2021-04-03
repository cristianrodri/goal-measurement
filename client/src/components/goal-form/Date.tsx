import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { SecondaryTitle } from '../Title'
import { RootState, setEndDate } from '../../redux'

const useStyles = makeStyles(() => ({
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const Date = () => {
  const classes = useStyles()
  const date = useSelector((state: RootState) => state.goalForm.end)
  const dispatch = useDispatch()

  return (
    <div className={classes.dateContainer}>
      <SecondaryTitle>When your goal will be achived</SecondaryTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="d MMMM yyyy"
          value={date}
          onChange={changedDate => dispatch(setEndDate(changedDate as Date))}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          disablePast
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default Date
