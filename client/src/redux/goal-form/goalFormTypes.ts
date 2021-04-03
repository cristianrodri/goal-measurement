import { DaysOfWeek, Goal, GoalFormActivities, Rewards } from '../../types'

export enum GoalFormTypes {
  SHORT_DESCRIPTION = 'SHORT_DESCRIPTION',
  BIG_DESCRIPTION = 'BIG_DESCRIPTION',
  ACTIVITIES = 'ACTIVITIES',
  ADD_ACTIVITY = 'ADD_ACTIVITY',
  DELETE_ACTIVITY = 'DELETE_ACTIVITY',
  ACTIVITY_NAME = 'ACTIVITY_NAME',
  ACTIVITY_DAYS = 'ACTIVITY_DAYS',
  SELECT_ALL_DAYS = 'SELECT_ALL_DAYS',
  UNSELECT_ALL_DAYS = 'UNSELECT_ALL_DAYS',
  EMPTY_ACTIVITY = 'EMPTY_ACTIVITY',
  REWARDS = 'REWARDS',
  ADD_REWARD = 'ADD_REWARD',
  DELETE_REWARD = 'DELETE_REWARD',
  WEEKLY_REWARD = 'WEEKLY_REWARD',
  END = 'END',
  GET_GOAL_DATA = 'GET_GOAL_DATA',
  EMPTY_FORM = 'EMPTY_FORM'
}

export interface ShortDescriptionAction {
  type: GoalFormTypes.SHORT_DESCRIPTION
  payload: string
}

export interface BigDescriptionAction {
  type: GoalFormTypes.BIG_DESCRIPTION
  payload: string
}

export interface FormActivitiesAction {
  type: GoalFormTypes.ACTIVITIES
  payload: GoalFormActivities[]
}

export interface AddActivitityAction {
  type: GoalFormTypes.ADD_ACTIVITY
}

export interface DeleteActivityAction {
  type: GoalFormTypes.DELETE_ACTIVITY
  payload: string
}

export interface ActivityNameAction {
  type: GoalFormTypes.ACTIVITY_NAME
  payload: string
}

export interface ActivityDaysAction {
  type: GoalFormTypes.ACTIVITY_DAYS
  day: keyof DaysOfWeek
}

export interface SelectAllDaysAction {
  type: GoalFormTypes.SELECT_ALL_DAYS
}

export interface UnselectAllDaysAction {
  type: GoalFormTypes.UNSELECT_ALL_DAYS
}

export interface EmptyActivitiyAction {
  type: GoalFormTypes.EMPTY_ACTIVITY
}

export interface GetRewardsAction {
  type: GoalFormTypes.REWARDS
  payload: Rewards
}

export interface AddRewardAction {
  type: GoalFormTypes.ADD_REWARD
  rewardType: keyof Rewards
  reward: string
}

export interface DeleteRewardAction {
  type: GoalFormTypes.DELETE_REWARD
  rewardType: keyof Rewards
  reward: string
}

export interface WeeklyRewardAction {
  type: GoalFormTypes.WEEKLY_REWARD
  payload: keyof DaysOfWeek
}

export interface EndAction {
  type: GoalFormTypes.END
  payload: Date | string
}

export interface GetGoalData {
  type: GoalFormTypes.GET_GOAL_DATA
  payload: Goal
}

export interface EmptyFormAction {
  type: GoalFormTypes.EMPTY_FORM
}

export type FormGoalAction =
  | ShortDescriptionAction
  | BigDescriptionAction
  | FormActivitiesAction
  | AddActivitityAction
  | DeleteActivityAction
  | ActivityNameAction
  | ActivityDaysAction
  | SelectAllDaysAction
  | UnselectAllDaysAction
  | EmptyActivitiyAction
  | GetRewardsAction
  | AddRewardAction
  | DeleteRewardAction
  | WeeklyRewardAction
  | EndAction
  | GetGoalData
  | EmptyFormAction
