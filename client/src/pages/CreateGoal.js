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
  addLastPerformance
} from '../redux'
import { displayErrorSnackbar } from '../redux'
import { createNewDayPerformance } from '../api/api_performance'
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

  const createDayPerformance = async (token, id, date) => {
    console.log(token, id, date)
    const res = await createNewDayPerformance(token, id, date)
    console.log('goku 3')

    if (res.success) dispatch(addLastPerformance(res.data))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = {
      ...goalFormState
    }

    delete data.activityName
    delete data.activityDays

    try {
      setDisabled(true)

      const dataDB = await createGoal(data, token)

      if (dataDB.success) {
        dispatch(addGoal(dataDB.data))
        dispatch(setSelectedGoal(dataDB.data._id))

        // create new day performance after goal is created
        await createDayPerformance(token, dataDB.data._id, {
          date: moment().format()
        })

        history.push(`/my-goals/${dataDB.data._id}`)
      } else if (dataDB.error) {
        dispatch(displayErrorSnackbar(dataDB.message))
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
