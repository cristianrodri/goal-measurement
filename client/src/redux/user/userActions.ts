import {
  UserAction,
  IsAuthAction,
  CompletedDataAction,
  UserDataAction,
  UserAvatarAction,
  ResetAction,
  UserTypes
} from './userTypes'
import { displayErrorSnackbar } from '../dialog/dialogActions'
import { getUserById } from '../../api/api_user'
import { URL } from './../../api/url'
import { getGoalsByUser } from '../../api/api_goals'
import { getGoals } from '../goal/goalActions'
import moment from 'moment'
import { Dispatch } from 'redux'
import { GoalAction } from '../goal/goalTypes'
import { User } from '../../types'
import { DialogAction } from '../dialog/dialogTypes'

export const getUserDataAPI = () => {
  return async (dispatch: Dispatch<UserAction | GoalAction | DialogAction>) => {
    const res = await getUserById()

    if (res.success) {
      dispatch(userData(res.data))

      if (res.hasAvatar)
        dispatch(userAvatar(`${URL}/api/user/${res.data._id}/avatar`))

      const goalRes = await getGoalsByUser(moment().utcOffset())

      if (goalRes.success) dispatch(getGoals(goalRes.data))
      dispatch(isAuthenticated(res.hasToken))
    } else {
      dispatch(displayErrorSnackbar(res.message))
    }

    dispatch(completedData())
  }
}

export const isAuthenticated = (hasToken: boolean): IsAuthAction => {
  return {
    type: UserTypes.IS_AUTH,
    payload: hasToken
  }
}

export const completedData = (): CompletedDataAction => {
  return {
    type: UserTypes.COMPLETED_DATA
  }
}

export const userData = (user: User): UserDataAction => {
  return {
    type: UserTypes.USER_DATA,
    payload: user
  }
}

export const userAvatar = (url: string): UserAvatarAction => {
  return {
    type: UserTypes.USER_AVATAR,
    payload: url
  }
}

export const logout = (): ResetAction => {
  return {
    type: UserTypes.RESET
  }
}
