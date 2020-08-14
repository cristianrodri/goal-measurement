import React, { useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/Context'
import { updateGoal, deleteGoal } from '../api/api_goals'
import { MainTitle } from '../components/Title'
import { FormDivider } from '../components/FormGoal'
import {
  FormShortDescription,
  FormBigDescription
} from '../components/goal-form/FormDescription'
import FormActivities from '../components/goal-form/Activities'
import Rewards from './../components/goal-form/Rewards'
import Date from './../components/goal-form/Date'
import GoalForm from './../components/goal-form/GoalForm'
import withGoalData from './../HOC/withGoalData'
import ChooseWeeklyReward from './../components/goal-form/ChooseWeeklyReward'
import { DeleteButton, PrimaryButton } from './../components/Button'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

const EditGoal = () => {
  const history = useHistory()
  const [cookies] = useCookies()
  const token = cookies.token
  const { state, dispatchError } = useContext(GlobalContext)
  const {
    shortDescription,
    bigDescription,
    activities,
    rewards,
    weeklyReward,
    endDate
  } = state
  const [disabled, setDisabled] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)

  useEffect(() => {
    document.title = 'Edit Goal'
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const data = {
      shortDescription,
      bigDescription,
      activities,
      rewards,
      weeklyReward,
      endDate
    }

    try {
      setDisabled(true)
      const res = await updateGoal(data, token, state.goalId)
      if (res.success) {
        history.push(`/my-goals/${res.data._id}`, {
          fromUpdatedGoal: true,
          message: res.message
        })
      } else if (res.error) {
        dispatchError(res.message)
        setDisabled(false)
      }
    } catch (error) {
      dispatchError(error.message)
      setDisabled(false)
    }
  }

  const openConfirmDialog = () => {
    setConfirmDialog(true)
  }

  const handleDeleteGoal = async () => {
    try {
      const res = await deleteGoal(token, state.goalId)

      if (res.success) {
        history.push(`/my-goals`, {
          fromDeleteGoal: true,
          message: res.message
        })
      } else if (res.error) {
        dispatchError(res.message)
      }
    } catch (error) {
      dispatchError(error.message)
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
      <GoalForm>
        <MainTitle>Edit Goal</MainTitle>
        <form onSubmit={handleSubmit}>
          <FormShortDescription />
          <FormBigDescription />
          <FormDivider />
          <FormActivities />
          <FormDivider />
          <Rewards />
          <FormDivider />
          <ChooseWeeklyReward />
          <FormDivider />
          <Date />
          <FormDivider />
          <PrimaryButton type="submit" disabled={disabled}>
            {!disabled ? 'Update Goal' : 'Updating goal...'}
          </PrimaryButton>
        </form>
        <DeleteButton onClick={openConfirmDialog}>Delete Goal</DeleteButton>
      </GoalForm>
    </>
  )
}

export default withGoalData(EditGoal)
