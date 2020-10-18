import {
  USER_DATA,
  IS_AUTH,
  RESET,
  USER_AVATAR,
  COMPLETED_DATA
} from './userTypes'

const initialState = {
  user: null,
  avatar: '',
  isAuth: false,
  isLoading: true
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETED_DATA:
      return {
        ...state,
        isLoading: false
      }
    case USER_DATA:
      return {
        ...state,
        user: action.payload
      }
    case IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      }
    case USER_AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
    case RESET:
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state
  }
}

export default userReducer
