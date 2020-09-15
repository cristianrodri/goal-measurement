import { USER_DATA, RESET, USER_AVATAR } from './userTypes'

const initialState = {
  user: null,
  avatar: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        user: action.payload
      }
    case USER_AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
    case RESET:
      return initialState

    default:
      return state
  }
}

export default userReducer
