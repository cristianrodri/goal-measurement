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
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = () => {
      // check if there is a goal with id from match.params.id
      const goalWithIdExist = goals.some(goal => {
        if (goal._id === id) {
          // setGoal({ ...goalObj })
          dispatch(setShortDescription(goal.shortDescription))
          dispatch(setBigDescription(goal.bigDescription))
          dispatch(setActivities(goal.activities))
          dispatch(setRewards(goal.rewards))
          dispatch(setWeeklyReward(goal.weeklyReward))
          dispatch(setEndDate(goal.end))
          setIsReady(true)
          return true
        }
      })

      if (!goalWithIdExist) {
        history.push('/404')
      } else {
      }
    }

    init()
  }, [])

  if (isReady) return <Component {...props} />
  else return null
}

export default withGoalData
