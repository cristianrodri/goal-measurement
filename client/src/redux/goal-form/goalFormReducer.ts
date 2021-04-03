import { DaysOfWeek, GoalFormState } from '../../types'
import { FormGoalAction, GoalFormTypes } from './goalFormTypes'

const defaultDays: DaysOfWeek = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
}

// transform default days to true { monday: true, tuesday: true... }
const allDaysTrue = (days: DaysOfWeek) =>
  Object.keys(days).reduce(
    (prev, cur): { [Property in keyof DaysOfWeek]: boolean } => ({
      ...prev,
      [cur]: true
    }),
    days
  )

const allDaysSelected = allDaysTrue(defaultDays)

const initialState: GoalFormState = {
  shortDescription: '',
  bigDescription: '',
  activities: [],
  activityName: '',
  activityDays: { ...defaultDays },
  rewards: {
    small: [],
    medium: [],
    large: []
  },
  weeklyReward: '',
  end: undefined
}

const goalFormReducer = (
  state: GoalFormState = initialState,
  action: FormGoalAction
): GoalFormState => {
  switch (action.type) {
    case GoalFormTypes.SHORT_DESCRIPTION:
      return {
        ...state,
        shortDescription: action.payload
      }
    case GoalFormTypes.BIG_DESCRIPTION:
      return {
        ...state,
        bigDescription: action.payload
      }
    case GoalFormTypes.ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case GoalFormTypes.ADD_ACTIVITY:
      return {
        ...state,
        activities: state.activities.concat({
          activity: state.activityName,
          days: state.activityDays
        })
      }
    case GoalFormTypes.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          activity => activity.activity !== action.payload // delete activity by name
        )
      }
    case GoalFormTypes.ACTIVITY_NAME:
      return {
        ...state,
        activityName: action.payload
      }
    case GoalFormTypes.ACTIVITY_DAYS:
      return {
        ...state,
        activityDays: {
          ...state.activityDays,
          [action.day]: !state.activityDays[action.day]
        } // change boolean day
      }
    case GoalFormTypes.SELECT_ALL_DAYS:
      return {
        ...state,
        activityDays: { ...allDaysSelected }
      }
    case GoalFormTypes.UNSELECT_ALL_DAYS:
      return {
        ...state,
        activityDays: { ...defaultDays }
      }
    case GoalFormTypes.EMPTY_ACTIVITY:
      return {
        ...state,
        activityName: '',
        activityDays: { ...defaultDays } // back all days to default (false)
      }
    case GoalFormTypes.REWARDS:
      return {
        ...state,
        rewards: action.payload
      }
    case GoalFormTypes.ADD_REWARD:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          [action.rewardType]: state.rewards[action.rewardType].concat(
            action.reward
          ) // add small, medium or large reward
        }
      }
    case GoalFormTypes.DELETE_REWARD:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          [action.rewardType]: state.rewards[action.rewardType].filter(
            reward => reward !== action.reward
          ) // delete small, medium or large reward
        }
      }
    case GoalFormTypes.WEEKLY_REWARD:
      return {
        ...state,
        weeklyReward: action.payload
      }
    case GoalFormTypes.END:
      return {
        ...state,
        end: action.payload
      }

    case GoalFormTypes.GET_GOAL_DATA:
      const {
        shortDescription,
        bigDescription,
        activities,
        rewards,
        weeklyReward,
        end
      } = action.payload
      return {
        ...state,
        shortDescription,
        bigDescription,
        activities,
        rewards,
        weeklyReward,
        end
      }
    case GoalFormTypes.EMPTY_FORM:
      return initialState

    default:
      return state
  }
}

export default goalFormReducer
