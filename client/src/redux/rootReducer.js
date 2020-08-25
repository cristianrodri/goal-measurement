import { combineReducer } from 'redux'
import userReducer from './user/userReducer'

const rootReducer = combineReducer({
  user: userReducer
})

export default rootReducer
