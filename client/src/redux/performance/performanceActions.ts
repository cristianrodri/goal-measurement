import { PerformanceState } from '../../types'
import {
  AddLastPerformanceAction,
  AllPerformancesAction,
  PerformanceTypes,
  RemoveLastPerformanceAction,
  ResetPerformanceAction,
  TodayPerformanceAction,
  UpdatePrevPerformanceAction
} from './performanceTypes'

export const getAllPerformances = (
  performances: PerformanceState[]
): AllPerformancesAction => {
  return {
    type: PerformanceTypes.ALL_PERFORMANCES,
    payload: performances
  }
}

export const setTodayPerformance = (
  performance: PerformanceState
): TodayPerformanceAction => {
  return {
    type: PerformanceTypes.TODAY_PERFORMANCE,
    payload: performance
  }
}

export const setPreviousPerformance = (
  performance: PerformanceState,
  lastPositionIndex: number
): UpdatePrevPerformanceAction => {
  return {
    type: PerformanceTypes.UPDATE_PREV_PERFORMANCE,
    payload: performance,
    lastPositionIndex
  }
}

export const removeLastPerformance = (): RemoveLastPerformanceAction => {
  return {
    type: PerformanceTypes.REMOVE_LAST_PERFORMANCE
  }
}

export const addLastPerformance = (
  performance: PerformanceState
): AddLastPerformanceAction => {
  return {
    type: PerformanceTypes.ADD_LAST_PERFORMANCE,
    payload: performance
  }
}

export const resetPerformance = (): ResetPerformanceAction => {
  return {
    type: PerformanceTypes.RESET_PERFORMANCE
  }
}
