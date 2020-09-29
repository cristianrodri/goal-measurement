import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetSelectedGoal, setSelectedGoal } from '../redux'

const withGoal = Component => props => {
  const goals = useSelector(state => state.goal.goals)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = props.match.params
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const goalExists = goals.some(goal => {
      // if goal id has the same id of the props, goal is found and end array loop returning true
      if (goal._id === id) {
        dispatch(setSelectedGoal(goal._id))
        setIsReady(true)
        return true
      }
    })

    if (!goalExists) history.push('/404')

    return () => dispatch(resetSelectedGoal())
  }, [])

  if (isReady) return <Component {...props} />
  else return null
}

export default withGoal
