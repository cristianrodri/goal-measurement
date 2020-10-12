import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
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
import {
  displayErrorSnackbar,
  setSelectedGoal,
  updateSelectedGoal
} from '../../redux'
import Loading from '../Loading'

const NewEndDate = ({ handlePrevious }) => {
  const { _id } = useSelector(state => state.goal.selectedGoal)
  const [date, setDate] = useState(moment().format())
  const [cookies] = useCookies()
  const token = cookies.token
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await updateGoal(
        { end: date, completed: false },
        _id,
        token,
        moment().utcOffset()
      )

      if (res.success) {
        dispatch(updateSelectedGoal(res.data.goal))
        dispatch(setSelectedGoal(res.data.goal._id))
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
        setIsLoading(false)
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
      setIsLoading(false)
    }
  }

  return (
    <>
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
        {isLoading ? (
          <Loading styledByParent />
        ) : (
          <>
            <Button onClick={handlePrevious} color="primary">
              Go back
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Change deadline
            </Button>
          </>
        )}
      </DialogActions>
    </>
  )
}

export default NewEndDate
