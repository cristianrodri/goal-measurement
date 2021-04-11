import { ComponentType, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { resetSelectedGoal, setSelectedGoal, RootState } from '../redux'
import moment from 'moment'
import EndDateReached from './../components/goal-dashboard/EndDateReached'

const withGoal = (
  Component: ComponentType<RouteComponentProps<{ id: string }>>
) => (props: RouteComponentProps<{ id: string }>) => {
  const goals = useSelector((state: RootState) => state.goal.goals)
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = props.match.params
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const goalExists = goals.some(goal => {
      // if goal id has the same id of the props, goal is found and end array loop returning true
      if (goal._id === id) {
        dispatch(setSelectedGoal(goal))
        setIsReady(true)
        return true
      }
    })

    if (!goalExists) history.push('/404')

    return () => {
      dispatch(resetSelectedGoal())
    }
  }, [])

  // after selectedGoal is dispatched check if it is the deadline
  if (selectedGoal) {
    const isEndGoalDate = moment().isSameOrAfter(
      moment(selectedGoal.end).startOf('day')
    )

    if (isEndGoalDate) return <EndDateReached goal={selectedGoal} />
  }

  if (isReady) return <Component {...props} />
  else return null
}

export default withGoal
