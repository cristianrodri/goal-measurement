import { USER_DATA, RESET, USER_AVATAR, COMPLETED_DATA } from './userTypes'
import { displayErrorSnackbar } from '../dialogs/dialogActions'
import { getUserById } from '../../api/api_user'
import { URL } from './../../api/url'
import { getGoalsByUser } from '../../api/api_goals'
import { getGoals } from '../goal/goalActions'

export const getUserDataAPI = token => {
  return async dispatch => {
    const res = await getUserById(token)

    if (res.success) {
      dispatch(userData(res.data))

      if (res.hasAvatar)
        dispatch(userAvatar(`${URL}/api/user/${res.data._id}/avatar`))

      const goalRes = await getGoalsByUser(token)

      if (goalRes.success) dispatch(getGoals(goalRes.data))
    } else {
      dispatch(displayErrorSnackbar(res.message))
    }

    dispatch(completedData())
  }
}

export const completedData = () => {
  return {
    type: COMPLETED_DATA
  }
}

export const userData = user => {
  return {
    type: USER_DATA,
    payload: user
  }
}

export const userAvatar = url => {
  return {
    type: USER_AVATAR,
    payload: url
  }
}

export const logout = () => {
  return {
    type: RESET
  }
}
