import { PerformanceState } from '../../types'

export enum PerformanceTypes {
  ALL_PERFORMANCES = 'ALL_PERFORMANCES',
  TODAY_PERFORMANCE = 'TODAY_PERFORMANCE',
  REMOVE_LAST_PERFORMANCE = 'REMOVE_LAST_PERFORMANCE',
  ADD_LAST_PERFORMANCE = 'ADD_LAST_PERFORMANCE',
  UPDATE_PREV_PERFORMANCE = 'UPDATE_PREV_PERFORMANCE',
  RESET_PERFORMANCE = 'RESET_PERFORMANCE'
}

export interface AllPerformancesAction {
  type: PerformanceTypes.ALL_PERFORMANCES
  payload: PerformanceState[]
}

export interface TodayPerformanceAction {
  type: PerformanceTypes.TODAY_PERFORMANCE
  payload: PerformanceState
}

export interface RemoveLastPerformanceAction {
  type: PerformanceTypes.REMOVE_LAST_PERFORMANCE
}

export interface AddLastPerformanceAction {
  type: PerformanceTypes.ADD_LAST_PERFORMANCE
  payload: PerformanceState
}

export interface UpdatePrevPerformanceAction {
  type: PerformanceTypes.UPDATE_PREV_PERFORMANCE
  payload: PerformanceState
  lastPositionIndex: number
}

export interface ResetPerformanceAction {
  type: PerformanceTypes.RESET_PERFORMANCE
}

export type PerformanceAction =
  | AllPerformancesAction
  | TodayPerformanceAction
  | RemoveLastPerformanceAction
  | AddLastPerformanceAction
  | UpdatePrevPerformanceAction
  | ResetPerformanceAction
