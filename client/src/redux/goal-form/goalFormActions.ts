import { DaysOfWeek, Goal, GoalFormActivities, Rewards } from '../../types'
import {
  ActivityDaysAction,
  ActivityNameAction,
  AddActivitityAction,
  AddRewardAction,
  BigDescriptionAction,
  DeleteActivityAction,
  DeleteRewardAction,
  EmptyActivitiyAction,
  EmptyFormAction,
  EndAction,
  FormActivitiesAction,
  GetGoalData,
  GetRewardsAction,
  GoalFormTypes,
  SelectAllDaysAction,
  ShortDescriptionAction,
  UnselectAllDaysAction,
  WeeklyRewardAction
} from './goalFormTypes'

export const setShortDescription = (
  description: string
): ShortDescriptionAction => {
  return {
    type: GoalFormTypes.SHORT_DESCRIPTION,
    payload: description
  }
}

export const setBigDescription = (
  description: string
): BigDescriptionAction => {
  return {
    type: GoalFormTypes.BIG_DESCRIPTION,
    payload: description
  }
}

export const setActivities = (
  activities: GoalFormActivities[]
): FormActivitiesAction => {
  return {
    type: GoalFormTypes.ACTIVITIES,
    payload: activities
  }
}

export const addActivitiy = (): AddActivitityAction => {
  return {
    type: GoalFormTypes.ADD_ACTIVITY
  }
}

export const deleteActivitiy = (name: string): DeleteActivityAction => {
  return {
    type: GoalFormTypes.DELETE_ACTIVITY,
    payload: name
  }
}

export const setActivityName = (name: string): ActivityNameAction => {
  return {
    type: GoalFormTypes.ACTIVITY_NAME,
    payload: name
  }
}

export const setActivityDays = (day: keyof DaysOfWeek): ActivityDaysAction => {
  return {
    type: GoalFormTypes.ACTIVITY_DAYS,
    day
  }
}

export const selectAllDays = (): SelectAllDaysAction => {
  return {
    type: GoalFormTypes.SELECT_ALL_DAYS
  }
}

export const unselectAllDays = (): UnselectAllDaysAction => {
  return {
    type: GoalFormTypes.UNSELECT_ALL_DAYS
  }
}

export const emptyActivity = (): EmptyActivitiyAction => {
  return {
    type: GoalFormTypes.EMPTY_ACTIVITY
  }
}

export const getRewards = (rewards: Rewards): GetRewardsAction => {
  return {
    type: GoalFormTypes.REWARDS,
    payload: rewards
  }
}

export const setReward = (
  rewardType: keyof Rewards,
  reward: string
): AddRewardAction => {
  return {
    type: GoalFormTypes.ADD_REWARD,
    rewardType,
    reward
  }
}

export const deleteReward = (
  rewardType: keyof Rewards,
  reward: string
): DeleteRewardAction => {
  return {
    type: GoalFormTypes.DELETE_REWARD,
    rewardType,
    reward
  }
}

export const setWeeklyReward = (day: keyof DaysOfWeek): WeeklyRewardAction => {
  return {
    type: GoalFormTypes.WEEKLY_REWARD,
    payload: day
  }
}

export const setEndDate = (date: Date | string): EndAction => {
  return {
    type: GoalFormTypes.END,
    payload: date
  }
}

export const getGoalData = (goal: Goal): GetGoalData => {
  return {
    type: GoalFormTypes.GET_GOAL_DATA,
    payload: goal
  }
}

export const emptyForm = (): EmptyFormAction => {
  return {
    type: GoalFormTypes.EMPTY_FORM
  }
}
