import moment from 'moment'
import { firstItemToLast } from '../../utils/arrays'
import { arrayOfStringLowercase } from './../../utils/arrays'
import { goalForm } from './goalFormTypes'

const daysOfWeek = arrayOfStringLowercase(firstItemToLast(moment.weekdays()))

// return an object of all days { monday: false | true, tuesday: false | true }
const daysOfWeekObj = (type = false) =>
  daysOfWeek.reduce((prev, cur) => ({ ...prev, [cur]: type }), {})

const defaultDays = daysOfWeekObj()

const allDaysSelected = daysOfWeekObj(true)

const initialState = {
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
  end: null
}

const goalFormReducer = (state = initialState, action) => {
  const {
    SHORT_DESCRIPTION,
    BIG_DESCRIPTION,
    ACTIVITIES,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    ACTIVITY_NAME,
    ACTIVITY_DAYS,
    SELECT_ALL_DAYS,
    EMPTY_ACTIVITY,
    REWARDS,
    ADD_REWARD,
    DELETE_REWARD,
    WEEKLY_REWARD,
    END,
    EMPTY_FORM
  } = goalForm

  switch (action.type) {
    case SHORT_DESCRIPTION:
      return {
        ...state,
        shortDescription: action.payload
      }
    case BIG_DESCRIPTION:
      return {
        ...state,
        bigDescription: action.payload
      }
    case ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: state.activities.concat({
          activity: state.activityName,
          days: state.activityDays
        })
      }
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          activity => activity.activity !== action.name
        )
      }
    case ACTIVITY_NAME:
      return {
        ...state,
        activityName: action.payload
      }
    case ACTIVITY_DAYS:
      return {
        ...state,
        activityDays: {
          ...state.activityDays,
          [action.day]: !state.activityDays[action.day]
        } // change boolean day
      }
    case SELECT_ALL_DAYS:
      return {
        ...state,
        activityDays: { ...allDaysSelected }
      }
    case EMPTY_ACTIVITY:
      return {
        ...state,
        activityName: '',
        activityDays: { ...defaultDays } // back all days to default (false)
      }
    case REWARDS:
      return {
        ...state,
        rewards: action.payload
      }
    case ADD_REWARD:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          [action.rewardType]: state.rewards[action.rewardType].concat(
            action.reward
          ) // add small, medium or large reward
        }
      }
    case DELETE_REWARD:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          [action.rewardType]: state.rewards[action.rewardType].filter(
            reward => reward !== action.reward
          ) // delete small, medium or large reward
        }
      }
    case WEEKLY_REWARD:
      return {
        ...state,
        weeklyReward: action.payload
      }
    case END:
      return {
        ...state,
        end: action.payload
      }
    case EMPTY_FORM:
      return initialState

    default:
      return state
  }
}

export default goalFormReducer
