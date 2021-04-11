import { ComponentType, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Loading from './../components/Loading'
import {
  displayErrorSnackbar,
  removeLastPerformance,
  getAllPerformances,
  setTodayPerformance,
  resetPerformance,
  RootState
} from '../redux'
import { getAllPerformancesByGoal } from '../api/api_performance'
import { RouteComponentProps } from 'react-router'

const withPerformanceData = (Component: ComponentType<RouteComponentProps>) => (
  props: RouteComponentProps
) => {
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  )
  const todayPerformance = useSelector(
    (state: RootState) => state.performance.todayPerformance
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentDateUTC = moment().utcOffset()

  useEffect(() => {
    const getAllPerformancesAPI = async (id: string, dateUTC: number) => {
      const res = await getAllPerformancesByGoal(id, dateUTC)

      if (res.success) {
        dispatch(getAllPerformances(res.data.allPerformances))
        dispatch(setTodayPerformance(res.data.todayPerformance))

        // if today is not working day or last performance is not done yet, remove last performance from allPerformance state
        if (
          res.data.todayPerformance.isWorkingDay &&
          !res.data.todayPerformance.done
        ) {
          dispatch(removeLastPerformance())
        }
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }

      setIsLoading(false)
    }

    try {
      if (!todayPerformance && selectedGoal)
        getAllPerformancesAPI(selectedGoal._id, currentDateUTC)
      else setIsLoading(false)
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }

    return () => {
      dispatch(resetPerformance())
    }
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} />
}

export default withPerformanceData
