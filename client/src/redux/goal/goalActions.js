import { getGoalsByUser } from '../../api/api_goals'
import { displayErrorSnackbar } from '../dialogs/dialogActions'
import {
  GOALS,
  SELECTED_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  REMOVE_GOAL,
  RESET_GOALS
} from './goalTypes'

export const getGoalsAPI = token => {
  return async dispatch => {
    const res = await getGoalsByUser(token)

    if (res.success) dispatch(getGoals(res.data))
    else dispatch(displayErrorSnackbar(res.message))
  }
}

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
