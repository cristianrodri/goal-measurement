import {
  GOALS,
  SELECTED_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  REMOVE_GOAL,
  RESET_GOALS
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
