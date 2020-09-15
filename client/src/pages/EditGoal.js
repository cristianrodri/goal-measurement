import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { updateGoal, deleteGoal } from '../api/api_goals'
import withGoalData from './../HOC/withGoalData'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import moment from 'moment'
import GoalForm from '../components/GoalForm'
import { DeleteButton } from '../components/Button'
import { displayErrorSnackbar } from '../redux'

const EditGoal = () => {
  const history = useHistory()
  const [cookies] = useCookies()
  const token = cookies.token
  const goal = useSelector(state => state.goal)
  const goalFormState = useSelector(state => state.goalForm)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const currentDay = moment().format('dddd').toLowerCase()

  useEffect(() => {
    document.title = 'Edit Goal'
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const data = {
      ...goalFormState
    }

    delete data.activityName
    delete data.activityDays

    try {
      setDisabled(true)
      const res = await updateGoal(data, token, currentDay)

      if (res.success) {
        // update goal from redux
        dispatch(updateGoal(res.data._id))

        // move into updated goal performance
        history.push(`/my-goals/${res.data._id}`, {
          fromUpdatedGoal: true,
          message: res.message
        })
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
        setDisabled(false)
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
      setDisabled(false)
    }
  }

  const openConfirmDialog = () => {
    setConfirmDialog(true)
  }

  const handleDeleteGoal = async () => {
    try {
      const res = await deleteGoal(token, goal._id)

      if (res.success) {
        // delete goal from redux
        dispatch(deleteGoal(res.goalId))

        history.push(`/my-goals`, {
          fromDeleteGoal: true,
          message: res.message
        })
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }
  }

  const closeConfirmDialog = () => {
    setConfirmDialog(false)
  }

  return (
    <>
      {
        // Dialog that confirm your password for deleting Goal
        <Dialog open={confirmDialog} onClose={closeConfirmDialog}>
          <DialogTitle>Confirm your password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your Goal?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={closeConfirmDialog}
            >
              Keep Goal
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDeleteGoal}
            >
              Delete Goal
            </Button>
          </DialogActions>
        </Dialog>
      }
      <GoalForm type="Edit" handleSubmit={handleSubmit} disabled={disabled} />
      <DeleteButton onClick={openConfirmDialog}>Delete Goal</DeleteButton>
    </>
  )
}

export default withGoalData(EditGoal)
