// export types
export { DialogTypes } from './dialog/dialogTypes'
export { GoalTypes } from './goal/goalTypes'
export { GoalFormTypes } from './goal-form/goalFormTypes'
export { PerformanceTypes } from './performance/performanceTypes'
export { UserTypes } from './user/userTypes'
export type { RootState } from './rootReducer'

// export actions
export {
  getUserDataAPI,
  userData,
  userAvatar,
  isAuthenticated,
  completedData,
  logout
} from './user/userActions'
export {
  getGoals,
  setSelectedGoal,
  addGoal,
  goalPerformancePercentage,
  updateSelectedGoal,
  removeGoal,
  resetSelectedGoal,
  resetGoals
} from './goal/goalActions'
export {
  getAllPerformances,
  setTodayPerformance,
  setPreviousPerformance,
  removeLastPerformance,
  addLastPerformance,
  resetPerformance
} from './performance/performanceActions'
export {
  displayDialog,
  confirmDialog,
  closeDialog,
  displaySuccessSnackbar,
  displayErrorSnackbar,
  closeSnackbar
} from './dialog/dialogActions'
export {
  setShortDescription,
  setBigDescription,
  setActivities,
  addActivitiy,
  deleteActivitiy,
  setActivityName,
  setActivityDays,
  selectAllDays,
  unselectAllDays,
  emptyActivity,
  getRewards,
  setReward,
  deleteReward,
  setWeeklyReward,
  setEndDate,
  getGoalData,
  emptyForm
} from './goal-form/goalFormActions'
