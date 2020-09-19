import {
  ALL_PERFORMANCES,
  TODAY_PERFORMANCE,
  RESET_PERFORMANCE,
  REMOVE_LAST_PERFORMANCE,
  ADD_LAST_PERFORMANCE
} from './performanceType'

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
