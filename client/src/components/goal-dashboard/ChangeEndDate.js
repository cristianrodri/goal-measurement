/* import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { SecondaryTitle } from '../Title'

const useStyles = makeStyles(theme => ({
  dateContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
  }
}))

const ChangeEndDate = () => {
  const classes = useStyles()
  const { state, dispatchEndDate } = useContext(GlobalContext)
  return (
    <div className={classes.dateContainer}>
      <SecondaryTitle>Type a new date</SecondaryTitle>
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
      <Button>Change date</Button>
    </div>
  )
}

export default ChangeEndDate
 */
