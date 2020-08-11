import React, { useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/Context'
import { updateGoal } from '../api/api_goals'
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

  const openConfirmDialog = () => {}

  return (
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
  )
}

export default withGoalData(EditGoal)
