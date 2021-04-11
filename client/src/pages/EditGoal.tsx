import { useState, useEffect, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateGoal, deleteGoal } from '../api/api_goals'
import withGoal from './../HOC/withGoal'
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
import { useDocumentTitle } from './../hooks/useDocumentTitle'
import {
  displayErrorSnackbar,
  emptyForm,
  updateSelectedGoal,
  removeGoal,
  RootState,
  getGoalData
} from '../redux'
import { GoalFormDB } from '../types'

const EditGoal = () => {
  const history = useHistory()
  const goalFormState = useSelector((state: RootState) => state.goalForm)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const clientUTC = moment().utcOffset()
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  )
  const goalId = selectedGoal ? selectedGoal._id : ''
  useDocumentTitle('Edit Goal')

  useEffect(() => {
    if (selectedGoal) {
      dispatch(getGoalData(selectedGoal))
    }

    return () => {
      dispatch(emptyForm())
    }
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const data: GoalFormDB = {
      shortDescription: goalFormState.shortDescription,
      bigDescription: goalFormState.bigDescription,
      activities: goalFormState.activities,
      rewards: goalFormState.rewards,
      weeklyReward: goalFormState.weeklyReward,
      end: goalFormState.end
    }
    try {
      setDisabled(true)

      const res = await updateGoal(data, goalId, clientUTC)

      if (res.success) {
        // update goal from redux
        dispatch(updateSelectedGoal(res.data.goal))

        // move into updated goal performance
        history.push(`/my-goals/${res.data.goal._id}`, {
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
      const res = await deleteGoal(goalId)

      if (res.success) {
        // delete goal from redux
        dispatch(removeGoal(res.goalId))

        history.push(`/my-goals`, {
          fromDeleteGoal: true,
          message: res.message
        })
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }
    } catch (error) {
      console.log(error)
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

export default withGoal(EditGoal)
