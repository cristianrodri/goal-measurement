import { PerformanceState } from '../../types'
import { PerformanceAction, PerformanceTypes } from './performanceTypes'

interface State {
  allPerformances: PerformanceState[]
  todayPerformance: PerformanceState | undefined
}

const initialState: State = {
  allPerformances: [],
  todayPerformance: undefined
}

const performanceReducer = (
  state = initialState,
  action: PerformanceAction
): State => {
  switch (action.type) {
    case PerformanceTypes.ALL_PERFORMANCES:
      return {
        ...state,
        allPerformances: action.payload
      }
    case PerformanceTypes.TODAY_PERFORMANCE:
      return {
        ...state,
        todayPerformance: action.payload
      }
    case PerformanceTypes.UPDATE_PREV_PERFORMANCE: {
      state.allPerformances[
        state.allPerformances.length - action.lastPositionIndex
      ] = action.payload
      return {
        ...state
      }
    }
    case PerformanceTypes.REMOVE_LAST_PERFORMANCE:
      return {
        ...state,
        allPerformances: state.allPerformances.slice(0, -1)
      }
    case PerformanceTypes.ADD_LAST_PERFORMANCE:
      return {
        ...state,
        allPerformances: state.allPerformances.concat(action.payload)
      }
    case PerformanceTypes.RESET_PERFORMANCE:
      return initialState
    default:
      return state
  }
}

export default performanceReducer
