import { USER_DATA } from './userTypes'

const initialState = {
  user: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}

export default userReducer
