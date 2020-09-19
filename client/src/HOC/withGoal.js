import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setSelectedGoal } from '../redux'

const withGoal = Component => props => {
  const goals = useSelector(state => state.goal.goals)
  const selectedGoal = useSelector(state => state.goal.selectedGoal)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = props.match.params

  useEffect(() => {
    const init = () => {
      const goalExists = goals.some(goal => {
        // if goal id has the same id of the props, goal is found and end array loop returning true
        if (goal._id === id) {
          dispatch(setSelectedGoal(goal._id))
          return true
        }
      })

      if (!goalExists) history.push('/404')
    }

    if (!selectedGoal) init()
  }, [])

  if (selectedGoal) return <Component {...props} />
  else return null
}

export default withGoal
