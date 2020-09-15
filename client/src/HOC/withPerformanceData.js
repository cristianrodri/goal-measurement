import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Loading from './../components/Loading'
import {
  setSelectedGoal,
  displayErrorSnackbar,
  removeLastPerformance,
  getAllPerformancesAPI,
  createPerformanceDay
} from '../redux'

const withPerformanceData = Component => props => {
  const { id } = props.match.params
  const [cookies] = useCookies()
  const token = cookies.token
  const history = useHistory()
  const selectedGoal = useSelector(state => state.goal.selectedGoal)
  const { allPerformances, todayPerformance } = useSelector(
    state => state.performance
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentDay = moment().format('dddd').toLowerCase()
  const isWorkingDay = selectedGoal.activities(
    activity => activity.days[currentDay]
  )

  const checkLastPerformance = async () => {
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
      await createPerformanceDay()
    }

    // if today performance is not done yet, remove last performance from allPerformances array
    if (!todayPerformance.done) dispatch(removeLastPerformance())
  }

  useEffect(() => {
    const init = async () => {
      // check if allPerformances state were called in DB previously by checking if allPerformances array is > 0, otherwise call API
      if (!allPerformances.length) {
        await getAllPerformancesAPI(token, id)
      }

      if (isWorkingDay) {
        checkLastPerformance()
      }

      setIsLoading(false)
    }

    dispatch(setSelectedGoal(id))

    // if goal is found in url id continue, otherwise return /404
    if (selectedGoal) {
      try {
        init()
      } catch (error) {
        dispatch(displayErrorSnackbar(error.message))
      }
    } else {
      history.push('/404')
    }
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withPerformanceData
