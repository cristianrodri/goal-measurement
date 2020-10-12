export const firstItemToLast = arr => [...arr.slice(1), ...arr.slice(0, 1)]

export const arrayOfStringLowercase = arr => arr.map(item => item.toLowerCase())

export const sumArray = array =>
  array.reduce((number, current) => number + current, 0)

export const averageArray = array => sumArray(array) / array.length

export const calculateReachedActivities = activities => {
  const reachedActivities = activities.filter(activity => activity.reached)

  return Math.floor((reachedActivities.length / activities.length) * 100)
}
