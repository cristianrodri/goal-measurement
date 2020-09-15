import {
  ALL_PERFORMANCES,
  TODAY_PERFORMANCE,
  REMOVE_LAST_PERFORMANCE,
  ADD_LAST_PERFORMANCE,
  RESET_PERFORMANCE
} from './performanceType'

const initialState = {
  allPerformances: [],
  todayPerformance: null
}

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PERFORMANCES:
      return {
        ...state,
        allPerformances: action.payload
      }
    case TODAY_PERFORMANCE:
      return {
        ...state,
        todayPerformance: action.payload
      }
    case REMOVE_LAST_PERFORMANCE:
      state.allPerformances.pop()
      return {
        ...state,
        allPerformances: state.allPerformances
      }
    case ADD_LAST_PERFORMANCE:
      return {
        ...state,
        allPerformances: state.allPerformances.concat(action.payload)
      }
    case RESET_PERFORMANCE:
      return initialState
    default:
      return state
  }
}

export default performanceReducer