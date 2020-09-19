import { USER_DATA, RESET, USER_AVATAR, COMPLETED_DATA } from './userTypes'

const initialState = {
  user: null,
  avatar: '',
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
