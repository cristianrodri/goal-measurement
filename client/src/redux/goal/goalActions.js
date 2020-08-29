import { GOALS, SELECTED_GOAL, REMOVE_GOAL } from './goalTypes'

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

export const removeGoal = id => {
  return {
    type: REMOVE_GOAL,
    id
  }
}
