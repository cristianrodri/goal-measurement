import { updateObjInArray } from './../../utils/arrays'
import {
  GOALS,
  SELECTED_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  REMOVE_GOAL
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
      return {
        ...state,
        selectedGoal: state.goals.filter(goal => goal._id === action.id)
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

    default:
      return state
  }
}

export default goalReducer
