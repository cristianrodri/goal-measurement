import { USER_DATA, RESET } from './userTypes'

const initialState = {
  user: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        user: action.payload
      }
    case RESET:
      return initialState

    default:
      return state
  }
}

export default userReducer
