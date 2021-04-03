import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedGoal, RootState, setSelectedGoal } from '../redux'
import { useHistory } from 'react-router-dom'

export const useSelectedGoal = (id: string) => {
  const goals = useSelector((state: RootState) => state.goal.goals)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const goalExists = goals.some(goal => {
      // if goal id has the same id of the props, goal is found and end array loop returning true
      if (goal._id === id) {
        dispatch(setSelectedGoal(goal))
        return true
      }
    })

    if (!goalExists) history.push('/404')

    return () => {
      dispatch(resetSelectedGoal())
    }
  }, [])
}
