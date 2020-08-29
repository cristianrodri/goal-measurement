import {
  ALL_PERFORMANCES,
  TODAY_PERFORMANCE,
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
    case RESET_PERFORMANCE:
      return initialState
    default:
      return state
  }
}

export default performanceReducer
