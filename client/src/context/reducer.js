import { initialState } from './Context'

export default (state, action) => {
  const {
    goalId,
    shortDescription,
    bigDescription,
    activityName,
    activityDays,
    activities,
    rewards,
    endDate
  } = initialState

  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return initialState
    case 'CHANGE_AVATAR':
      return { ...state, avatar: action.image }
    case 'SUCCESS_DIALOG':
      return {
        ...state,
        successDialog: true,
        dialogMessage: action.message
      }
    case 'CONFIRM_DIALOG':
      return {
        ...state,
        confirmDialog: true,
        dialogMessage: action.message
      }
    case 'CLOSE_DIALOG': {
      return {
        ...state,
        confirmDialog: false,
        successDialog: false,
        dialogMessage: ''
      }
    }
    case 'ERROR':
      return {
        ...state,
        error: true,
        snackbarMessage: action.message
      }
    case 'SUCCESS':
      return {
        ...state,
        success: true,
        snackbarMessage: action.message
      }
    case 'EMPTY_SNACKBAR':
      return {
        ...state,
        error: false,
        success: false,
        snackbarMessage: ''
      }

    // Create and Edit goal state
    case 'GOAL_ID':
      return {
        ...state,
        goalId: action.id
      }
    case 'CREATED_AT':
      return {
        ...state,
        createdAt: action.createdAt
      }
    case 'SHORT_DESCRIPTION':
      return {
        ...state,
        shortDescription: action.shortDescription
      }
    case 'BIG_DESCRIPTION':
      return {
        ...state,
        bigDescription: action.bigDescription
      }
    case 'ACTIVITY_NAME':
      return {
        ...state,
        activityName: action.activityName
      }
    case 'ACTIVITY_DAYS':
      return {
        ...state,
        activityDays: {
          ...state.activityDays,
          [action.day]: action.checked
        }
      }
    case 'SELECT_ALL_DAYS':
      const allDays = Object.keys(activityDays)
      const days = {}
      allDays.forEach(day => {
        days[day] = true
      })

      return {
        ...state,
        activityDays: days
      }

    case 'GET_ACTIVITIES':
      return {
        ...state,
        activities: action.activities
      }

    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: state.activities.concat({
          activity: state.activityName,
          days: state.activityDays
        })
      }
    case 'EMPTY_ACTIVITY_NAME':
      return {
        ...state,
        activityName: ''
      }
    case 'EMPTY_ACTIVITY_DAYS':
      return {
        ...state,
        activityDays
      }
    case 'DELETE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(
          activity => activity.activity !== action.name
        )
      }

    case 'GET_REWARDS':
      return {
        ...state,
        rewards: action.rewards
      }

    case 'ADD_REWARD':
      state.rewards[action.name] = [
        ...state.rewards[action.name],
        action.reward
      ]
      return { ...state, rewards: state.rewards }

    case 'DELETE_REWARD':
      state.rewards[action.name] = state.rewards[action.name].filter(
        reward => reward !== action.reward
      )
      return { ...state, rewards: state.rewards }

    case 'WEEKLY_REWARD':
      return {
        ...state,
        weeklyReward: action.rewardDay
      }

    case 'END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }

    case 'EMPTY_GOAL_FORM':
      // values received by initialState
      return {
        ...state,
        goalId,
        shortDescription,
        bigDescription,
        activityName,
        activityDays,
        activities,
        rewards,
        endDate
      }

    // Performances state
    case 'GET_ALL_PERFORMANCES':
      return {
        ...state,
        allPerformances: action.performances
      }

    case 'TODAY_PERFORMANCE':
      return {
        ...state,
        todayPerformance: action.todayPerformance
      }

    default:
      return state
  }
}
