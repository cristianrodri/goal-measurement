import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import Loading from './../components/Loading'
import {
  displayErrorSnackbar,
  removeLastPerformance,
  getAllPerformances,
  setTodayPerformance
} from '../redux'
import { getAllPerformancesByGoal } from '../api/api_performance'
import { createNewDayPerformance } from './../api/api_performance'

const withPerformanceData = Component => props => {
  const [cookies] = useCookies()
  const token = cookies.token
  const selectedGoal = useSelector(state => state.goal.selectedGoal)
  console.log(selectedGoal)
  const id = selectedGoal._id
  const allPerformances = useSelector(
    state => state.performance.allPerformances
  )
  const todayPerformance = useSelector(
    state => state.performance.todayPerformance
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentDay = moment().format('dddd').toLowerCase()
  // const isWorkingDay = selectedGoal.activities.some(
  //   activity => activity.days[currentDay]
  // )

  const getAllPerformancesAPI = async (token, id) => {
    const res = await getAllPerformancesByGoal(token, id)

    if (res.success) dispatch(getAllPerformances(res.data))
    else if (res.error) dispatch(displayErrorSnackbar(res.message))
  }

  const createPerformanceDay = async (token, id) => {
    const currentDate = moment().format()

    const res = await createNewDayPerformance(token, id, { date: currentDate })

    if (res.success) {
      dispatch(setTodayPerformance(res.data))
    } else if (res.error) {
      dispatch(displayErrorSnackbar(res.message))
    }
  }

  const checkLastPerformance = async () => {
    // if todayPerformance is true, it means that todayPerformance has received data from last performance of allPerformances. Therefore, the rest of this function is not needed when is called again in the case allPerformances state is modified.
    if (todayPerformance) return setIsLoading(false)

    const lastPerformance = allPerformances[allPerformances.length - 1]

    const lastPerformanceDate = lastPerformance.date
    const startDay = moment(lastPerformanceDate).isSameOrAfter(
      moment().startOf('day')
    )
    const endDay = moment(lastPerformanceDate).isBefore(
      moment().startOf('day').add(1, 'days')
    )

    const lastPerformanceIsCurrentDay = startDay && endDay

    // if it's not current day, create new day performance and add it to the todayPerformance state
    if (!lastPerformanceIsCurrentDay) {
      await createPerformanceDay(token, id)
    } else {
      dispatch(setTodayPerformance(lastPerformance))
    }
  }

  useEffect(() => {
    // in the first render check if allPerformances has length, otherwise
    if (allPerformances.length) checkLastPerformance()
  }, [allPerformances])

  useEffect(() => {
    const checkToRemoveLastPerformance = () => {
      // if today performance is not done yet, remove last performance from allPerformances array
      if (!todayPerformance.done) dispatch(removeLastPerformance())

      setIsLoading(false)
    }

    if (todayPerformance) checkToRemoveLastPerformance()
  }, [todayPerformance])

  useEffect(() => {
    const init = async () => {
      // check if allPerformances state were called in DB previously by checking if allPerformances array is > 0, otherwise call API. When allPerformances is changed, the another useEffect will be called again by checking if there is today performance into it and create if it doesn't have
      if (!allPerformances.length) {
        await getAllPerformancesAPI(token, id)
      }
    }

    try {
      init()
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withPerformanceData
