import { updateObjInArray } from './../../utils/arrays'
import {
  GOALS,
  SELECTED_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  REMOVE_GOAL,
  RESET_GOALS
} from './goalTypes'

const initialState = {
  goals: [],
  selectedGoal: null
}

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOALS:
      return {
        ...state,
        goals: action.payload
      }
    case SELECTED_GOAL:
      const filteredGoal = state.goals.filter(goal => goal._id === action.id)
      return {
        ...state,
        selectedGoal: filteredGoal.length ? filteredGoal : null
      }
    case ADD_GOAL:
      return {
        ...state,
        goals: state.goals.concat(action.payload)
      }
    case UPDATE_GOAL:
      return {
        ...state,
        goals: updateObjInArray(action.payload, state.goals)
      }
    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.id)
      }
    case RESET_GOALS:
      return initialState

    default:
      return state
  }
}

export default goalReducer
