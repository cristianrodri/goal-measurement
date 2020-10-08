import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { updateGoal } from '../../api/api_goals'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import { setSelectedGoal, updateSelectedGoal } from '../../redux'

const NewEndDate = ({ handlePrevious }) => {
  const { end, _id } = useSelector(state => state.goal.selectedGoal)
  const [date, setDate] = useState(end)
  const [cookies] = useCookies()
  const token = cookies.token
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      const res = await updateGoal(
        { end: date, completed: false },
        _id,
        token,
        moment().utcOffset()
      )

      if (res.success) {
        dispatch(updateSelectedGoal(res.data.goal))
        dispatch(setSelectedGoal(res.data.goal._id))
      }
    } catch (error) {}
  }

  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add new deadline</DialogTitle>
      <DialogContent>
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
            minDate={date}
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrevious} color="primary">
          Go back
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Change deadline
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewEndDate
