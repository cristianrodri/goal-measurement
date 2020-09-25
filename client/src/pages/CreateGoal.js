import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { createGoal } from '../api/api_goals'
import GoalForm from '../components/GoalForm'
import {
  emptyForm,
  setSelectedGoal,
  addGoal,
  getAllPerformances,
  setTodayPerformance,
  displayErrorSnackbar
} from '../redux'
import moment from 'moment'

const CreateGoal = () => {
  const history = useHistory()
  const [cookies] = useCookies()
  const token = cookies.token
  const [disabled, setDisabled] = useState(false)
  const goalFormState = useSelector(state => state.goalForm)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Create Goal'

    return () => dispatch(emptyForm())
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

      const res = await createGoal(data, token, {
        currentDate: moment().format()
      })

      if (res.success) {
        dispatch(addGoal(res.data.goal))
        dispatch(setSelectedGoal(res.data.goal._id))

        dispatch(getAllPerformances(res.data.allPerformances))
        dispatch(setTodayPerformance(res.data.todayPerformanc))

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
