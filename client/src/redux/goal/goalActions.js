import {
  GOALS,
  SELECTED_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  GOAL_PERCENTAGE_TODAY,
  REMOVE_GOAL,
  RESET_GOALS,
  RESET_SELECTED_GOAL
} from './goalTypes'

export const getGoals = goals => {
  return {
    type: GOALS,
    payload: goals
  }
}

export const setSelectedGoal = id => {
  return {
    type: SELECTED_GOAL,
    id
  }
}

export const addGoal = goal => {
  return {
    type: ADD_GOAL,
    payload: goal
  }
}

export const updateSelectedGoal = goal => {
  return {
    type: UPDATE_GOAL,
    payload: goal
  }
}

export const goalPerformancePercentage = (id, percentage) => {
  return {
    type: GOAL_PERCENTAGE_TODAY,
    id,
    percentage
  }
}

export const removeGoal = id => {
  return {
    type: REMOVE_GOAL,
    id
  }
}

export const resetGoals = () => {
  return {
    type: RESET_GOALS
  }
}

export const resetSelectedGoal = () => {
  return {
    type: RESET_SELECTED_GOAL
  }
}
