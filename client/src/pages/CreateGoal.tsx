import React, { useState, useEffect, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createGoal } from '../api/api_goals'
import GoalForm from '../components/GoalForm'
import {
  emptyForm,
  setSelectedGoal,
  addGoal,
  getAllPerformances,
  setTodayPerformance,
  displayErrorSnackbar,
  RootState
} from '../redux'
import moment from 'moment'
import { useDocumentTitle } from './../hooks/useDocumentTitle'
import { GoalFormDB, GoalFormState } from '../types'
import { Dispatch } from 'redux'
import { AddGoalAction, SelectedGoalAction } from '../redux/goal/goalTypes'
import { EmptyFormAction } from '../redux/goal-form/goalFormTypes'
import {
  AllPerformancesAction,
  TodayPerformanceAction
} from '../redux/performance/performanceTypes'
import { ErrorSnackbarAction } from '../redux/dialog/dialogTypes'

const CreateGoal = () => {
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)
  const goalFormState = useSelector((state: RootState) => state.goalForm)
  const dispatch: Dispatch<
    | AddGoalAction
    | EmptyFormAction
    | SelectedGoalAction
    | AllPerformancesAction
    | TodayPerformanceAction
    | ErrorSnackbarAction
  > = useDispatch()
  useDocumentTitle('Create Goal')

  useEffect(() => {
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

      const res = await createGoal(data, moment().utcOffset())

      if (res.success) {
        dispatch(addGoal(res.data.goal))
        dispatch(setSelectedGoal(res.data.goal._id))

        dispatch(getAllPerformances(res.data.allPerformances))
        dispatch(setTodayPerformance(res.data.todayPerformance))

        history.push(`/my-goals/${res.data.goal._id}`)
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
        setDisabled(false)
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
      setDisabled(false)
    }
  }

  return (
    <GoalForm type="Create" handleSubmit={handleSubmit} disabled={disabled} />
  )
}

export default CreateGoal
