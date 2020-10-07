import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import Loading from './../components/Loading'
import {
  displayErrorSnackbar,
  removeLastPerformance,
  getAllPerformances,
  setTodayPerformance,
  resetPerformance
} from '../redux'
import { getAllPerformancesByGoal } from '../api/api_performance'

const withPerformanceData = Component => props => {
  const [cookies] = useCookies()
  const token = cookies.token
  const selectedGoal = useSelector(state => state.goal.selectedGoal)
  const id = selectedGoal._id
  const todayPerformance = useSelector(
    state => state.performance.todayPerformance
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentDateUTC = moment().utcOffset()

  useEffect(() => {
    const getAllPerformancesAPI = async (token, id, date) => {
      const res = await getAllPerformancesByGoal(token, id, date)

      if (res.success) {
        dispatch(getAllPerformances(res.data.allPerformances))
        dispatch(setTodayPerformance(res.data.todayPerformance))

        // if last performance is not done yet, remove last performance from allPerformance state
        if (!res.data.todayPerformance.done) dispatch(removeLastPerformance())
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }

      setIsLoading(false)
    }

    try {
      if (!todayPerformance) getAllPerformancesAPI(token, id, currentDateUTC)
      else setIsLoading(false)
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }

    return () => dispatch(resetPerformance())
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withPerformanceData
