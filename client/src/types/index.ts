export type WeekDays =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

//  ******************************** REDUX STATE ********************************

// Goal state
export interface Rewards {
  small: string[]
  medium: string[]
  large: string[]
}

export type DaysOfWeek = {
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
}

interface Activities {
  _id: string
  activity: string
  days: DaysOfWeek
}

// Goal reducer
export interface Goal {
  _id: string
  rewards: Rewards
  completed: boolean
  owner: string
  shortDescription: string
  bigDescription: string
  isWorkingDay: boolean
  performanceTodayPercentage: number
  activities: Activities[]
  weeklyReward: keyof DaysOfWeek
  end: Date | string
  createdAt: Date | string
}

// Goal form state
export interface GoalFormActivities {
  activity: string
  days: DaysOfWeek
}

export interface GoalFormDB {
  shortDescription?: string
  bigDescription?: string
  activities?: GoalFormActivities[]
  rewards?: Rewards
  weeklyReward?: keyof DaysOfWeek | ''
  end?: Date | string | undefined
  completed?: boolean
}

export interface GoalFormState extends GoalFormDB {
  activityName: string
  activityDays: DaysOfWeek
}

// performance state
export interface PerformanceActivity {
  _id: string
  reached: boolean
  activity: string
}

export interface PerformanceState {
  _id: string
  activities: PerformanceActivity[]
  done: boolean
  isWorkingDay: boolean
  date: Date | string
  goalDeadline: Date | string
}

// user state
export interface User {
  _id: string
  username: string
  email: string
  isVerified: boolean
  createdAt: Date | string
}
