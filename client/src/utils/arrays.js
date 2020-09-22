export const updateObjInArray = (obj, arr) => {
  const index = arr.findIndex(item => item._id === obj._id)

  return [...arr.splice(index, 1, obj)]
}

export const firstItemToLast = arr => [...arr.slice(1), ...arr.slice(0, 1)]

export const arrayOfStringLowercase = arr => arr.map(item => item.toLowerCase())

export const sumArray = array =>
  array.reduce((number, current) => number + current, 0)

export const averageArray = array => sumArray(array) / array.length
