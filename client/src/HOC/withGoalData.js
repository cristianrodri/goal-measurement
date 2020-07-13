import React, { useEffect, useState, useContext } from 'react'
import { getGoalById } from '../api/api_goals'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/Context'
import Loading from './../components/Loading'

const withGoalData = Component => props => {
  const { id } = props.match.params
  const history = useHistory()
  const [cookies] = useCookies()
  const [isLoading, setIsLoading] = useState(true)
  const {
    state,
    dispatchGoalId,
    dispatchCreatedAt,
    dispatchShortDescription,
    dispatchBigDescription,
    dispatchGetActivities,
    dispatchGetRewards,
    dispatchWeeklyReward,
    dispatchEndDate,
    dispatchError
  } = useContext(GlobalContext)

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getGoalById(cookies.token, id)

        if (data.success) {
          const {
            _id,
            createdAt,
            shortDescription,
            bigDescription,
            activities,
            rewards,
            weeklyReward,
            end
          } = data.data

          dispatchGoalId(_id)
          dispatchCreatedAt(createdAt)
          dispatchShortDescription(shortDescription)
          dispatchBigDescription(bigDescription)
          dispatchGetActivities(activities)
          dispatchGetRewards(rewards)
          dispatchWeeklyReward(weeklyReward)
          dispatchEndDate(end)

          setIsLoading(false)
        } else if (data.error) {
          history.push('/404')
        }
      } catch (error) {
        dispatchError(error.message)
      }
    }

    // check if goalId state is different from params id or goalId is and empty string. If any case is true, an api must be called
    if (id !== state.goalId || state.goalId === '') {
      init()
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withGoalData
