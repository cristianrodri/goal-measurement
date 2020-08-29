import { combineReducer } from 'redux'
import userReducer from './user/userReducer'
import goalReducer from './goal/goalReducer'

const rootReducer = combineReducer({
  user: userReducer,
  goal: goalReducer
})

export default rootReducer
