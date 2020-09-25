import { goalForm } from './goalFormTypes'

const {
  SHORT_DESCRIPTION,
  BIG_DESCRIPTION,
  ACTIVITIES,
  ADD_ACTIVITY,
  DELETE_ACTIVITY,
  ACTIVITY_NAME,
  ACTIVITY_DAYS,
  SELECT_ALL_DAYS,
  UNSELECT_ALL_DAYS,
  EMPTY_ACTIVITY,
  REWARDS,
  ADD_REWARD,
  DELETE_REWARD,
  WEEKLY_REWARD,
  END,
  EMPTY_FORM
} = goalForm

export const setShortDescription = description => {
  return {
    type: SHORT_DESCRIPTION,
    payload: description
  }
}

export const setBigDescription = description => {
  return {
    type: BIG_DESCRIPTION,
    payload: description
  }
}

export const setActivities = activities => {
  return {
    type: ACTIVITIES,
    payload: activities
  }
}

export const addActivitiy = () => {
  return {
    type: ADD_ACTIVITY
  }
}

export const deleteActivitiy = name => {
  return {
    type: DELETE_ACTIVITY,
    name
  }
}

export const setActivityName = name => {
  return {
    type: ACTIVITY_NAME,
    payload: name
  }
}

export const setActivityDays = day => {
  return {
    type: ACTIVITY_DAYS,
    day
  }
}

export const selectAllDays = () => {
  return {
    type: SELECT_ALL_DAYS
  }
}

export const unselectAllDays = () => {
  return {
    type: UNSELECT_ALL_DAYS
  }
}

export const emptyActivity = () => {
  return {
    type: EMPTY_ACTIVITY
  }
}

export const setRewards = rewards => {
  return {
    type: REWARDS,
    payload: rewards
  }
}

export const setReward = (rewardType, reward) => {
  return {
    type: ADD_REWARD,
    rewardType,
    reward
  }
}

export const deleteReward = (rewardType, reward) => {
  return {
    type: DELETE_REWARD,
    rewardType,
    reward
  }
}

export const setWeeklyReward = day => {
  return {
    type: WEEKLY_REWARD,
    payload: day
  }
}

export const setEndDate = date => {
  return {
    type: END,
    payload: date
  }
}

export const emptyForm = () => {
  return {
    type: EMPTY_FORM
  }
}
