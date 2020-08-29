import {
  ALL_PERFORMANCES,
  TODAY_PERFORMANCE,
  RESET_PERFORMANCE
} from './performanceType'

export const getAllPerformances = performances => {
  return {
    type: ALL_PERFORMANCES,
    payload: performances
  }
}

export const todayPerformance = performance => {
  return {
    type: TODAY_PERFORMANCE,
    payload: performance
  }
}

export const resetPerformance = () => {
  return {
    type: RESET_PERFORMANCE
  }
}
