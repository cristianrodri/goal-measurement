import React, { useReducer, useEffect, useState } from 'react'
import reducer from './reducer'
import { useCookies } from 'react-cookie'
import { getUserById, userAvatar } from '../api/api_user'
import Loading from '../components/Loading'

export const initialState = {
  user: {},
  avatar: '',
  error: false,
  success: false,
  snackbarMessage: '',
  successDialog: false,
  confirmDialog: false,
  dialogMessage: '',

  // Create and Edit goal state
  goalId: '',
  createdAt: undefined,
  shortDescription: '',
  bigDescription: '',
  activityName: '',
  activityDays: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  },
  activities: [],
  rewards: {
    small: [],
    medium: [],
    large: []
  },
  weeklyReward: '',
  endDate: new Date(),

  // All performances by goalId
  allPerformances: [],
  todayPerformance: {}
}

export const GlobalContext = React.createContext(initialState)

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies()
  const hasToken = cookies.token

  useEffect(() => {
    const checkIsLogged = async () => {
      try {
        if (hasToken) {
          const data = await getUserById(hasToken)
          dispatchUserData(data.user)

          if (data.hasAvatar) {
            const avatar = await userAvatar(data.user._id)
            if (avatar.status === 200) dispatchChangeAvatar(avatar.url)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    checkIsLogged()
  }, [])

  const isAuthenticated = () => hasToken

  const dispatchUserData = data => {
    dispatch({ type: 'GET_USER', payload: data })
  }

  const dispatchLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const dispatchChangeAvatar = url => {
    dispatch({ type: 'CHANGE_AVATAR', image: url })
  }

  // Dispatch error global state (DisplaySnackbar component is called once in MainRouter)
  const dispatchError = message => {
    dispatch({ type: 'ERROR', message })
  }

  // Dispatch success global state (DisplaySnackbar component is called once in MainRouter)
  const dispatchSuccess = message => {
    dispatch({ type: 'SUCCESS', message })
  }

  const dispatchEmptySnackbar = () => {
    dispatch({ type: 'EMPTY_SNACKBAR' })
  }

  // Dispatch successDialog global state (SuccessDialog component is called once in MainRouter)
  const dispatchSuccessDialog = message => {
    dispatch({ type: 'SUCCESS_DIALOG', message })
  }

  // Dispatch confirmDialog global state (ConfirmDialog component is called when is needed)
  const dispatchConfirmDialog = message => {
    dispatch({ type: 'CONFIRM_DIALOG', message })
  }

  const dispatchCloseDialog = () => {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  // GOAL DISPATCHING
  const dispatchGoalId = id => {
    dispatch({ type: 'GOAL_ID', id })
  }

  const dispatchCreatedAt = createdAt => {
    dispatch({ type: 'CREATED_AT', createdAt })
  }

  const dispatchShortDescription = shortDescription => {
    dispatch({ type: 'SHORT_DESCRIPTION', shortDescription })
  }

  const dispatchBigDescription = bigDescription => {
    dispatch({ type: 'BIG_DESCRIPTION', bigDescription })
  }

  const dispatchActivityName = activityName => {
    dispatch({ type: 'ACTIVITY_NAME', activityName })
  }

  const dispatchActivityDays = (day, checked) => {
    dispatch({ type: 'ACTIVITY_DAYS', day, checked })
  }

  const dispatchAllDays = () => {
    dispatch({ type: 'SELECT_ALL_DAYS' })
  }

  const dispatchEmptyActivityName = () => {
    dispatch({ type: 'EMPTY_ACTIVITY_NAME' })
  }

  const dispatchEmptyActivityDays = () => {
    dispatch({ type: 'EMPTY_ACTIVITY_DAYS' })
  }

  const dispatchGetActivities = activities => {
    dispatch({ type: 'GET_ACTIVITIES', activities })
  }

  const dispatchAddActivity = () => {
    dispatch({ type: 'ADD_ACTIVITY' })
    dispatchEmptyActivityName()
    dispatchEmptyActivityDays()
  }

  const dispatchDeleteActivity = name => {
    dispatch({ type: 'DELETE_ACTIVITY', name })
  }

  const dispatchGetRewards = rewards => {
    dispatch({ type: 'GET_REWARDS', rewards })
  }

  const dispatchAddReward = (name, reward) => {
    dispatch({ type: 'ADD_REWARD', reward, name: name.toLowerCase() })
  }

  const dispatchDeleteReward = (name, reward) => {
    dispatch({ type: 'DELETE_REWARD', reward, name: name.toLowerCase() })
  }

  const dispatchWeeklyReward = rewardDay => {
    dispatch({ type: 'WEEKLY_REWARD', rewardDay })
  }

  const dispatchEndDate = endDate => {
    dispatch({ type: 'END_DATE', endDate })
  }

  const dispatchEmptyGoalForm = () => {
    dispatch({ type: 'EMPTY_GOAL_FORM' })
  }

  // PERFORMANCES BY GOAL
  const dispatchAllPerformances = performances => {
    dispatch({ type: 'GET_ALL_PERFORMANCES', performances })
  }

  const dispatchTodayPerformance = todayPerformance => {
    dispatch({ type: 'TODAY_PERFORMANCE', todayPerformance })
  }

  if (isLoading) return <Loading />

  return (
    <GlobalContext.Provider
      value={{
        state,
        isAuthenticated,
        dispatchUserData,
        dispatchLogout,
        dispatchChangeAvatar,
        dispatchError,
        dispatchSuccess,
        dispatchEmptySnackbar,
        dispatchSuccessDialog,
        dispatchConfirmDialog,
        dispatchCloseDialog,
        dispatchGoalId,
        dispatchCreatedAt,
        dispatchShortDescription,
        dispatchBigDescription,
        dispatchAddActivity,
        dispatchActivityName,
        dispatchActivityDays,
        dispatchGetActivities,
        dispatchAllDays,
        dispatchEmptyActivityDays,
        dispatchDeleteActivity,
        dispatchGetRewards,
        dispatchAddReward,
        dispatchDeleteReward,
        dispatchWeeklyReward,
        dispatchEndDate,
        dispatchEmptyGoalForm,
        dispatchAllPerformances,
        dispatchTodayPerformance
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
