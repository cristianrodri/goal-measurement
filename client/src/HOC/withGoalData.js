import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setShortDescription,
  setBigDescription,
  setActivities,
  setRewards,
  setWeeklyReward,
  setEndDate
} from '../redux'

const withGoalData = Component => props => {
  const { id } = props.match.params
  const history = useHistory()
  const goals = useSelector(state => state.goal.goals)
  const dispatch = useDispatch()
  const [goal, setGoal] = useState({})

  useEffect(() => {
    const init = () => {
      dispatch(setShortDescription(goal.shortDescription))
      dispatch(setBigDescription(goal.bigDescription))
      dispatch(setActivities(goal.activities))
      dispatch(setRewards(goal.rewards))
      dispatch(setWeeklyReward(goal.weeklyReward))
      dispatch(setEndDate(goal.end))
    }

    // check if there is a goal with id from match.params.id
    const goalWithIdExist = goals.some(goalObj => {
      if (goalObj._id === id) {
        setGoal({ ...goal, goalObj })
        return true
      }
    })

    if (goalWithIdExist) {
      init()
    } else {
      history.push('/404')
    }
  }, [])

  return <Component {...props} />
}

export default withGoalData
