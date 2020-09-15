import { USER_DATA, RESET, USER_AVATAR } from './userTypes'
import { displayErrorSnackbar } from '../dialogs/dialogActions'
import { getUserById } from '../../api/api_user'
import { URL } from './../../api/url'

export const getUserDataAPI = token => {
  return async dispatch => {
    const res = await getUserById(token)

    if (res.success) {
      dispatch(userData(res.data))

      console.log('daimakoro')

      if (res.hasAvatar)
        dispatch(userAvatar(`${URL}/api/user/${res.data._id}/avatar`))
    } else {
      dispatch(displayErrorSnackbar(res.message))
    }
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
