import { USER_DATA, RESET } from './userTypes'

export const getUserData = data => {
  return {
    type: USER_DATA,
    payload: data
  }
}

export const logout = () => {
  return {
    type: RESET
  }
}
