import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import goalReducer from './goal/goalReducer'
import performanceReducer from './performance/performanceReducer'
import dialogReducer from './dialog/dialogReducer'
import goalFormReducer from './goal-form/goalFormReducer'

const rootReducer = combineReducers({
  user: userReducer,
  goal: goalReducer,
  performance: performanceReducer,
  dialog: dialogReducer,
  goalForm: goalFormReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
