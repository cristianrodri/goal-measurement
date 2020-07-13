import React, { useEffect, useState, useContext } from 'react'
import {
  getAllPerformancesByGoal,
  createPerformanceAPI
} from '../api/api_performance'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import { GlobalContext } from '../context/Context'
import Loading from './../components/Loading'

const withPerformanceData = Component => props => {
  const [cookies] = useCookies()
  const [isLoading, setIsLoading] = useState(true)
  const {
    state,
    dispatchAllPerformances,
    dispatchTodayPerformance,
    dispatchError
  } = useContext(GlobalContext)

  const createPerformance = async () => {
    const activitiesName = state.activities
      .filter(activity => activity.days[moment().format('dddd').toLowerCase()])
      .map(activity => ({
        activity: activity.activity
      }))

    try {
      const res = await createPerformanceAPI(cookies.token, state.goalId, {
        activities: activitiesName
      })

      if (res.success) {
        dispatchTodayPerformance(res.data)
        setIsLoading(false)
      } else if (res.error) {
        dispatchError(res.message)
      }
    } catch (error) {
      dispatchError(error.message)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getAllPerformancesByGoal(cookies.token, state.goalId)

        if (res.success) {
          dispatchAllPerformances(res.allPerformances)

          // if there is no performance today, create one and add it to todayPerformance global state, but only activities with working today. Otherwise only add todayPerformanceData to todayPerformance global state
          if (!res.todayPerformance.length) {
            createPerformance()
          } else {
            dispatchTodayPerformance(res.todayPerformance[0])
            setIsLoading(false)
          }
        } else if (res.error && res.status) {
          createPerformance()
        }
      } catch (error) {
        console.log(error)
        dispatchError(error.message)
      }
    }

    init()
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withPerformanceData
