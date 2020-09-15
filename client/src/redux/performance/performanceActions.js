import { displayErrorSnackbar } from '../dialogs/dialogActions'
import {
  getAllPerformancesByGoal,
  createNewDayPerformance
} from '../../api/api_performance'
import {
  ALL_PERFORMANCES,
  TODAY_PERFORMANCE,
  RESET_PERFORMANCE,
  REMOVE_LAST_PERFORMANCE,
  ADD_LAST_PERFORMANCE
} from './performanceType'
import moment from 'moment'

export const getAllPerformances = performances => {
  return {
    type: ALL_PERFORMANCES,
    payload: performances
  }
}

export const setTodayPerformance = performance => {
  return {
    type: TODAY_PERFORMANCE,
    payload: performance
  }
}

export const removeLastPerformance = () => {
  return {
    type: REMOVE_LAST_PERFORMANCE
  }
}

export const addLastPerformance = performance => {
  return {
    type: ADD_LAST_PERFORMANCE,
    payload: performance
  }
}

export const resetPerformance = () => {
  return {
    type: RESET_PERFORMANCE
  }
}

export const getAllPerformancesAPI = async (token, id) => {
  return async dispatch => {
    const res = await getAllPerformancesByGoal(token, id)

    if (res.success) dispatch(getAllPerformances(res.data))
    else if (res.error) dispatch(displayErrorSnackbar(res.message))
  }
}

export const createPerformanceDay = async (token, id) => {
  return async dispatch => {
    const currentDate = moment().format()

    const res = await createNewDayPerformance(token, id, currentDate)

    if (res.success) {
      dispatch(setTodayPerformance(res.data))
    } else if (res.error) {
      dispatch(displayErrorSnackbar(res.message))
    }
  }
}
