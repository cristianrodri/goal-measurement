import { User } from '../../types'
import { UserTypes, UserAction } from './userTypes'

export interface UserState {
  user: User | undefined
  avatar: string
  isAuth: boolean
  isLoading: boolean
}

const initialState: UserState = {
  user: undefined,
  avatar: '',
  isAuth: false,
  isLoading: true
}

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserTypes.COMPLETED_DATA:
      return {
        ...state,
        isLoading: false
      }
    case UserTypes.USER_DATA:
      return {
        ...state,
        user: action.payload
      }
    case UserTypes.IS_AUTH:
      return {
        ...state,
        isAuth: action.payload
      }
    case UserTypes.USER_AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
    case UserTypes.RESET:
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state
  }
}

export default userReducer
