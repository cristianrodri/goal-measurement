export {
  getUserDataAPI,
  userData,
  userAvatar,
  completedData,
  logout
} from './user/userActions'
export {
  getGoals,
  setSelectedGoal,
  addGoal,
  updateGoal,
  removeGoal,
  resetGoals
} from './goal/goalActions'
export {
  getAllPerformances,
  setTodayPerformance,
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
} from './dialogs/dialogActions'
export {
  setShortDescription,
  setBigDescription,
  setActivities,
  addActivitiy,
  deleteActivitiy,
  setActivityName,
  setActivityDays,
  selectAllDays,
  emptyActivity,
  setRewards,
  setReward,
  deleteReward,
  setWeeklyReward,
  setEndDate,
  emptyForm
} from './goal-form/goalFormActions'
