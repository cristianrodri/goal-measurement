import { GoalAction, GoalTypes } from './goalTypes'
import { Goal } from './../../types'
import { weekDays } from '../../utils/dates'

interface GoalState {
  goals: Goal[]
  selectedGoal: Goal | undefined
}

const initialState: GoalState = {
  goals: [],
  selectedGoal: undefined
}

const goalReducer = (
  state: GoalState = initialState,
  action: GoalAction
): GoalState => {
  switch (action.type) {
    case GoalTypes.GOALS:
      return {
        ...state,
        goals: action.payload
      }
    case GoalTypes.SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: state.goals.find(goal => goal._id === action.payload._id)
      }
    case GoalTypes.ADD_GOAL:
      return {
        ...state,
        goals: state.goals.concat(action.payload)
      }
    case GoalTypes.UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map(
          (goal): Goal =>
            goal._id === action.payload._id
              ? {
                  ...action.payload,
                  isWorkingDay: action.payload.activities.some(
                    activity => activity.days[weekDays[new Date().getDay()]]
                  ),
                  performanceTodayPercentage: 0
                }
              : goal
        )
      }
    case GoalTypes.GOAL_PERCENTAGE_TODAY:
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal._id === action.id
            ? { ...goal, performanceTodayPercentage: action.percentage }
            : goal
        )
      }
    case GoalTypes.REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.id)
      }
    case GoalTypes.RESET_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: undefined
      }
    case GoalTypes.RESET_GOALS:
      return initialState

    default:
      return state
  }
}

export default goalReducer
