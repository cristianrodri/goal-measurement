import { USER_DATA } from './userTypes'

export const getUserData = data => {
  return {
    type: USER_DATA,
    payload: data
  }
}
