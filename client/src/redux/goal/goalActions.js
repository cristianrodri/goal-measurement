import {
  GOALS,
  SELECTED_GOAL,
  REMOVE_GOAL,
  ADD_GOAL,
  RESET_GOALS
} from './goalTypes'

export const getGoals = goals => {
  return {
    type: GOALS,
    payload: goals
  }
}

export const getSelectedGoal = id => {
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

export const updateGoal = goal => {
  return {
    type: UPDATE_GOAL,
    payload: goal
  }
}

export const removeGoal = id => {
  return {
    type: REMOVE_GOAL,
    id
  }
}

export const resetGoals = id => {
  return {
    type: RESET_GOALS,
    id
  }
}
