import { combineReducer } from 'redux'
import userReducer from './user/userReducer'
import goalReducer from './goal/goalReducer'
import performanceReducer from './performance/performanceReducer'

const rootReducer = combineReducer({
  user: userReducer,
  goal: goalReducer,
  performance: performanceReducer
})

export default rootReducer
