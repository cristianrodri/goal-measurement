import React, { useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/Context'
import { createGoal } from '../api/api_goals'
import { MainTitle } from '../components/Title'
import { FormDivider } from '../components/FormGoal'
import {
  FormShortDescription,
  FormBigDescription
} from '../components/goal-form/FormDescription'
import { PrimaryButton } from '../components/Button'
import FormActivities from '../components/goal-form/Activities'
import Rewards from './../components/goal-form/Rewards'
import Date from './../components/goal-form/Date'
import GoalForm from './../components/goal-form/GoalForm'
import ChooseWeeklyReward from './../components/goal-form/ChooseWeeklyReward'

const CreateGoal = () => {
  const history = useHistory()
  const [cookies] = useCookies()
  const token = cookies.token
  const {
    state,
    dispatchError,
    dispatchEmptyGoalForm,
    dispatchGoalId
  } = useContext(GlobalContext)
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
    document.title = 'Create Goal'
    dispatchEmptyGoalForm()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const data = {
      shortDescription,
      bigDescription,
      activities,
      rewards,
      weeklyReward,
      end: endDate
    }

    try {
      setDisabled(true)

      const dataDB = await createGoal(data, token)

      if (dataDB.success) {
        dispatchGoalId(dataDB.data._id)
        history.push(`/my-goals/${dataDB.data._id}`)
      } else if (dataDB.error) {
        dispatchError(dataDB.message)
        setDisabled(false)
      }
    } catch (error) {
      dispatchError(error.message)
      setDisabled(false)
    }
  }

  return (
    <GoalForm>
      <MainTitle>Create one goal</MainTitle>
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
          {!disabled ? 'Create Goal' : 'Creating goal...'}
        </PrimaryButton>
      </form>
    </GoalForm>
  )
}

export default CreateGoal
