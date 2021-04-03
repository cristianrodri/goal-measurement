import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPerformancesByGoal } from '../api/api_performance'
import {
  getAllPerformances,
  removeLastPerformance,
  resetPerformance,
  RootState,
  setTodayPerformance
} from '../redux'
import { displayErrorSnackbar } from './../redux/dialog/dialogActions'

export const usePerformanceData = () => {
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
      // else setIsLoading(false)
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }

    return () => {
      dispatch(resetPerformance())
    }
  }, [selectedGoal])

  return { isLoading }
}
