import { PerformanceActivity } from '../types'

export const firstItemToLast = (arrayString: string[]) => [
  ...arrayString.slice(1),
  ...arrayString.slice(0, 1)
]

export const arrayOfStringLowercase = (arrayString: string[]) =>
  arrayString.map(item => item.toLowerCase())

export const sumArray = (arrayNumber: number[]) =>
  arrayNumber.reduce((number, current) => number + current, 0)

export const averageArray = (arrayNumbers: number[]) =>
  sumArray(arrayNumbers) / arrayNumbers.length

export const calculateReachedActivities = (
  activities: PerformanceActivity[]
) => {
  const reachedActivities = activities.filter(activity => activity.reached)

  return Math.floor((reachedActivities.length / activities.length) * 100)
}
