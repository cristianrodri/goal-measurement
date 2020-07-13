import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { GlobalContext } from '../../context/Context'
import { SecondaryTitle } from '../Title'

const useStyles = makeStyles(theme => ({
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const Date = () => {
  const classes = useStyles()
  const { state, dispatchEndDate } = useContext(GlobalContext)
  return (
    <div className={classes.dateContainer}>
      <SecondaryTitle>When your goal will be achived</SecondaryTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="d MMMM yyyy"
          value={state.endDate}
          onChange={changedDate => dispatchEndDate(changedDate)}
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
