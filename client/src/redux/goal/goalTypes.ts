import { Goal } from '../../types'

export enum GoalTypes {
  GOALS = 'GOALS',
  SELECTED_GOAL = 'SELECTED_GOAL',
  ADD_GOAL = 'ADD_GOAL',
  UPDATE_GOAL = 'UPDATE_GOAL',
  REMOVE_GOAL = 'REMOVE_GOAL',
  GOAL_PERCENTAGE_TODAY = 'GOAL_PERCENTAGE_TODAY',
  RESET_SELECTED_GOAL = 'RESET_SELECTED_GOAL',
  RESET_GOALS = 'RESET_GOALS'
}

export interface GetGoalsAction {
  type: GoalTypes.GOALS
  payload: Goal[]
}

export interface SelectedGoalAction {
  type: GoalTypes.SELECTED_GOAL
  payload: Goal
}

export interface AddGoalAction {
  type: GoalTypes.ADD_GOAL
  payload: Goal
}

export interface UpdateGoalAction {
  type: GoalTypes.UPDATE_GOAL
  payload: Goal
}

export interface RemoveGoalAction {
  type: GoalTypes.REMOVE_GOAL
  id: string
}

export interface GoalPercentageTodayAction {
  type: GoalTypes.GOAL_PERCENTAGE_TODAY
  id: string
  percentage: number
}

export interface ResetSelectedGoalAction {
  type: GoalTypes.RESET_SELECTED_GOAL
}

export interface ResetGoalsAction {
  type: GoalTypes.RESET_GOALS
}

export type GoalAction =
  | GetGoalsAction
  | SelectedGoalAction
  | AddGoalAction
  | UpdateGoalAction
  | RemoveGoalAction
  | GoalPercentageTodayAction
  | ResetSelectedGoalAction
  | ResetGoalsAction
