import { Goal } from '../../types'
import {
  AddGoalAction,
  GetGoalsAction,
  GoalTypes,
  RemoveGoalAction,
  SelectedGoalAction,
  UpdateGoalAction,
  GoalPercentageTodayAction,
  ResetGoalsAction,
  ResetSelectedGoalAction
} from './goalTypes'

export const getGoals = (goals: Goal[]): GetGoalsAction => {
  return {
    type: GoalTypes.GOALS,
    payload: goals
  }
}

export const setSelectedGoal = (goal: Goal): SelectedGoalAction => {
  return {
    type: GoalTypes.SELECTED_GOAL,
    payload: goal
  }
}

export const addGoal = (goal: Goal): AddGoalAction => {
  return {
    type: GoalTypes.ADD_GOAL,
    payload: goal
  }
}

export const updateSelectedGoal = (goal: Goal): UpdateGoalAction => {
  return {
    type: GoalTypes.UPDATE_GOAL,
    payload: goal
  }
}

export const removeGoal = (id: string): RemoveGoalAction => {
  return {
    type: GoalTypes.REMOVE_GOAL,
    id
  }
}

export const goalPerformancePercentage = (
  id: string,
  percentage: number
): GoalPercentageTodayAction => {
  return {
    type: GoalTypes.GOAL_PERCENTAGE_TODAY,
    id,
    percentage
  }
}

export const resetSelectedGoal = (): ResetSelectedGoalAction => {
  return {
    type: GoalTypes.RESET_SELECTED_GOAL
  }
}

export const resetGoals = (): ResetGoalsAction => {
  return {
    type: GoalTypes.RESET_GOALS
  }
}
